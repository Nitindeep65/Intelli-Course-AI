// models/ActivityLog.ts
import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['video', 'quiz', 'lesson', 'chat', 'login'],
      required: true
    },
    title: String,
    courseId: String,
    timestamp: { type: Date, default: Date.now },
    metadata: mongoose.Schema.Types.Mixed // Flexible additional data
  },
  { timestamps: true }
);

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
