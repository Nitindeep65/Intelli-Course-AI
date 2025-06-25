// models/CourseProgress.ts
import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: String, required: true }, // e.g., "react-bootcamp"
    completedPercentage: { type: Number, default: 0 },
    lastAccessed: Date,
    completedModules: [String], // e.g., ['intro', 'hooks', 'context']
  },
  { timestamps: true }
);

export default mongoose.models.CourseProgress || mongoose.model('CourseProgress', ProgressSchema);
