import mongoose, { Schema, Document } from 'mongoose';
import { Donor } from '../types/index';

export interface DonorDocument extends Donor, Document {
  createdAt: Date;
  updatedAt: Date;
}

const DonorSchema = new Schema<DonorDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true }
);

export const DonorModel = mongoose.model<DonorDocument>('Donor', DonorSchema);
