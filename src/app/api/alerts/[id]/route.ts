import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Alert from '@/models/Alert';
import PriceHistory from '@/models/PriceHistory';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await params;
    
    // Find the alert first to get price history IDs
    const alert = await Alert.findById(id);

    if (!alert) {
      return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    }

    // Delete all associated price history entries
    if (alert.priceHistories && alert.priceHistories.length > 0) {
      await PriceHistory.deleteMany({ _id: { $in: alert.priceHistories } });
    }

    // Delete the alert
    await Alert.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Alert deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting alert:', error);
    return NextResponse.json({ error: 'Failed to delete alert' }, { status: 500 });
  }
}

