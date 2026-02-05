import mongoose from "mongoose"; 
const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    course: {type: String, required: true},
    lessons: {
      type: [mongoose.Schema.Types.Mixed],   
      default: []       
    }
  },
  { collection: "modules" }
);
export default moduleSchema;