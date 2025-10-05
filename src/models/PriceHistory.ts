import mongoose, { Document, Schema } from 'mongoose';

export interface IPriceHistory extends Document {
  alertId: mongoose.Types.ObjectId;
  price: number;
  timestamp: Date;
}

const PriceHistorySchema: Schema = new Schema({
  alertId: { type: mongoose.Types.ObjectId, required: true, ref: 'Alert' },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const PriceHistory = mongoose.models.PriceHistory || mongoose.model<IPriceHistory>('PriceHistory', PriceHistorySchema);

export default PriceHistory;
