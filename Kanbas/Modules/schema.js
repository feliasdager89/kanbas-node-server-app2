import mongoose from "mongoose"; 
const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "modules" }
);
export default moduleSchema;