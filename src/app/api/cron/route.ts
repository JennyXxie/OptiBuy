import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Alert, { IAlert } from '@/models/Alert';
import PriceHistory, { IPriceHistory } from '@/models/PriceHistory';
import { PriceTracker } from '@/tools/priceTracker';

const priceTracker = new PriceTracker();

export async function GET(req: Request) {
  await dbConnect();

  try {
    const alerts = await Alert.find({ isActive: true });
    const updatedAlerts: IAlert[] = [];

    for (const alert of alerts) {
      console.log(`Polling price for alert: ${alert.alertName} (${alert.productLink})`);
      const pricePoint = await priceTracker.poll(alert.productLink);

      if (pricePoint && pricePoint.price !== alert.currentPrice) {
        // Update current price on the alert
        alert.currentPrice = pricePoint.price;
        alert.updatedAt = new Date();

        // Create new price history entry
        const newPriceHistory: IPriceHistory = await PriceHistory.create({
          alertId: alert._id,
          price: pricePoint.price,
          timestamp: new Date(pricePoint.t),
        });

        // Add new price history reference to the alert
        alert.priceHistories.push(newPriceHistory._id);
        await alert.save();
        updatedAlerts.push(alert);

        // Check for 10% price drop (relative to the first price point, or previous point)
        if (alert.priceHistories.length > 1) {
          const initialPriceEntry = await PriceHistory.findById(alert.priceHistories[0]);
          if (initialPriceEntry && initialPriceEntry.price > 0) {
            const priceDrop = ((initialPriceEntry.price - pricePoint.price) / initialPriceEntry.price) * 100;
            if (priceDrop >= 10) {
              console.log(`Significant price drop detected for ${alert.alertName}: ${priceDrop.toFixed(2)}%`);
              // TODO: Implement push notification here
            }
          }
        }

      } else if (pricePoint && pricePoint.price === alert.currentPrice) {
        console.log(`Price for ${alert.alertName} unchanged: ${pricePoint.price}`);
      } else {
        console.warn(`Failed to get price for ${alert.alertName} (${alert.productLink}) during polling.`);
      }
    }

    return NextResponse.json({ success: true, updatedCount: updatedAlerts.length, updatedAlerts }, { status: 200 });
  } catch (error) {
    console.error('Error during periodic price check:', error);
    return NextResponse.json({ error: 'Failed to perform periodic price check' }, { status: 500 });
  }
}
