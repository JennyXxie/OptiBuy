import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Alert from '@/models/Alert';
import { PriceTracker } from '@/tools/priceTracker';

const priceTracker = new PriceTracker();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id: alertId } = await params;
    const alert = await Alert.findById(alertId);

    if (!alert) {
      return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    }

    const offers = await priceTracker.findBestDeal(alert.productLink);

    return NextResponse.json({ success: true, data: offers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching best deal:', error);
    return NextResponse.json({ error: 'Failed to fetch best deal' }, { status: 500 });
  }
}

