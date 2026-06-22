import { Schema, model, Document } from 'mongoose';

export interface IActivity extends Document {
  user: Schema.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['running', 'cycling', 'swimming', 'walking', 'gym'] },
    duration: { type: Number, required: true }, // in minutes
    distance: { type: Number, default: null }, // in kilometers
    calories: { type: Number, required: true },
    notes: { type: String, default: null }
  },
  { timestamps: true }
);

export default model<IActivity>('Activity', activitySchema);
