import mongoose, { Schema, models } from 'mongoose';

const QuizResultSchema = new Schema({
  userEmail: { type: String, required: true },
  topic: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  responses: [
    {
      question: String,
      selected: String,
      correct: String,
      isCorrect: Boolean,
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

export default models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);
