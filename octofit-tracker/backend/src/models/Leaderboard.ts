import { Schema, model, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Schema.Types.ObjectId;
  team?: Schema.Types.ObjectId;
  rank: number;
  points: number;
  totalActivities: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    rank: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 }
  },
  { timestamps: true }
);

leaderboardSchema.index({ points: -1, rank: 1 });

export default model<ILeaderboard>('Leaderboard', leaderboardSchema);
