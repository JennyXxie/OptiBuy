import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Alert, { IAlert } from '@/models/Alert';
import PriceHistory, { IPriceHistory } from '@/models/PriceHistory';
import { PriceTracker } from '@/tools/priceTracker';

const priceTracker = new PriceTracker();

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { productLink, alertName, userId } = await req.json();

    if (!productLink || !alertName || !userId) {
      return NextResponse.json({ error: 'Product link, alert name, and user ID are required' }, { status: 400 });
    }

    // Use PriceTracker to get the current price
    const pricePoint = await priceTracker.trackNow(productLink);

    let currentPrice = 0;
    if (pricePoint) {
      currentPrice = pricePoint.price;
    } else {
      console.warn(`Could not get initial price for ${productLink}. Setting to 0.`);
      // Optionally, you could return an error or a different status if initial price is mandatory
    }

    const newAlert: IAlert = await Alert.create({
      userId,
      alertName,
      productLink,
      currentPrice,
      isActive: true, // New alerts are active by default
    });

    // If a price was found, save it to price history
    if (pricePoint) {
      const newPriceHistory: IPriceHistory = await PriceHistory.create({
        alertId: newAlert._id,
        price: pricePoint.price,
        timestamp: new Date(pricePoint.t),
      });
      newAlert.priceHistories.push(newPriceHistory._id);
      await newAlert.save();
    }

    return NextResponse.json({ success: true, data: newAlert }, { status: 201 });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await dbConnect();

  try {
    // In a real application, you would get userId from the session
    // For now, we'll fetch all alerts, or you can add a query parameter for userId
    const alerts = await Alert.find({ isActive: true }).populate('priceHistories').lean();

    return NextResponse.json({ success: true, data: alerts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}
