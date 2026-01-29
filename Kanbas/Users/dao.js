import model from "./model.js";
import mongoose from "mongoose";
//import db from "../Database/index.js";
//let { users } = db
export const createUser = (user) => {
  delete user._id
  return model.create(user);

} // implemented later
export const findAllUsers = () => model.find();

export const findUserById = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return model.findById(id);
};
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });

export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

// Returns the updated user document instead of an update status
export const updateUserAndReturn = (userId, user) =>
  model.findByIdAndUpdate(userId, { $set: user }, { new: true });


export const deleteUser = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return model.deleteOne({ _id: id });
};

export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role }) 

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};





