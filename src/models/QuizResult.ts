import mongoose from 'mongoose';

const QuizResultSchema = new mongoose.Schema(
  {
    userEmail: String,
    topic: String,
    score: Number,
    total: Number,
  },
  { timestamps: true }
);

export default mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);
