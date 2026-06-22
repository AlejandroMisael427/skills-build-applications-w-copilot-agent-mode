import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  instructions: string[];
  equipment?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    type: { type: String, required: true, enum: ['cardio', 'strength', 'flexibility', 'sports'] },
    duration: { type: Number, required: true }, // in minutes
    caloriesBurned: { type: Number, required: true },
    instructions: [{ type: String, required: true }],
    equipment: [{ type: String }]
  },
  { timestamps: true }
);

export default model<IWorkout>('Workout', workoutSchema);
