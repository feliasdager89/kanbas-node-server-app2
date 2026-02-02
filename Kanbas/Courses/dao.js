import model from "./model.js";
import mongoose from "mongoose";
//import db from "../Database/index.js";
//let { users } = db
export const createCourse = (course) => {
  delete course._id
  return model.create(course);

} // implemented later
export const findAllCourses = () => model.find();

export const findCourseById = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return model.findById(id);
}; 

export const findCourseByName = (name) =>  model.findOne({ name: name });

// "number" is the course code in the frontend data
export const findCourseByNumber = (number) =>  model.findOne({ number: number });

export const deleteCourse = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return model.deleteOne({ _id: id });
};

export const updateCourse = (courseId, course) => model.updateOne({ _id: courseId }, { $set: course });

// Returns the updated course document instead of an update status
export const updateCourseAndReturn = (courseId, course) =>
  model.findByIdAndUpdate(courseId, { $set: course }, { new: true });   