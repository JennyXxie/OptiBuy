import mongoose, { Document, Schema } from 'mongoose';
import PriceHistory, { IPriceHistory } from './PriceHistory';

export interface IAlert extends Document {
  userId: string;
  alertName: string;
  productLink: string;
  currentPrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  priceHistories: IPriceHistory['_id'][]; // Array of PriceHistory object IDs
}

const AlertSchema: Schema = new Schema({
  userId: { type: String, required: true },
  alertName: { type: String, required: true },
  productLink: { type: String, required: true },
  currentPrice: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  priceHistories: [{ type: Schema.Types.ObjectId, ref: 'PriceHistory' }],
});

// Update `updatedAt` on save
AlertSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Alert = mongoose.models.Alert || mongoose.model<IAlert>('Alert', AlertSchema);

export default Alert;
