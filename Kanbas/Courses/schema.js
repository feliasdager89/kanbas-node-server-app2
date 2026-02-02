import mongoose from "mongoose";

// Align schema with frontend shape in kanbas-web-app2/src/Kanbas/Database/courses.json
const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String },
    startDate: String,
    endDate: String,
    department: String,
    credits: Number,
    description: String,
    image: String,
    // Optional: faculty reference for ownership; uses the User model name
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "courses", timestamps: true }
);

export default courseSchema;