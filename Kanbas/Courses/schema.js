import mongoose  from "mongoose";   

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "Courses" }
);

export default courseSchema;