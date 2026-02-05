import model from "./model.js" 
import mongoose from "mongoose" 

export const createModule = (module)=>{
    delete module._id;
    return model.create(module);
} 

export const findAllModules = () => model.find();  

export const findModuleByCourseId = (courseId) => {
    if(!mongoose.Types.ObjectId.isValid(courseId)) return null
    return model.find({ courseId: courseId });
}

export const findModuleById = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) return null
    return model.findById(id);
} 

export const findModuleByName = (name) => {
    return model.findOne({ name: name });
} 

export const updateModule = (id, module) => model.updateOne({ _id: id }, { $set: module });

export const deleteModule = (id) => model.deleteOne({ _id: id }); 

