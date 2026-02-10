import model from "./model.js"; 
import mongoose from "mongoose"; 

export const createAssignment = (assignment)=>{
    delete assignment._id;
    return model.create(assignment);
} 

export const findAllAssignments = () => model.find();  

export const findAssignmentById = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) return null
    return model.findById(id);
}  


export const findAssignmentsByCourseId = (courseId) => {
    // Course is stored as a string field `course` in schema
    return model.find({ course: courseId });
}   

export const findAssignmentsByModuleId = (moduleId) => {
    // Module is stored as a string field `module` in schema
    return model.find({ module: moduleId });
}

export const updateAssignment = (id, assignment) => model.updateOne({ _id: id }, { $set: assignment });

export const deleteAssignment = (id) => model.deleteOne({ _id: id });   
