import mongoose  from "mongoose";   

const assignmentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        availableFrom: Date,
        dueDate: Date, 
        course: String
    },
    { collection: "assignments", timestamps: true }
);

export default assignmentSchema;