import { Schema, model, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: Schema.Types.ObjectId[];
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model<ITeam>('Team', teamSchema);
