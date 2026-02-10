//import db from "../Database/index.js"; 
//import model from "./model.js";
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) { 


  // List assignments for a course
  const findAssignmentsByCourseId = async (req, res) => {
    const { cid } = req.params;
    const assignments = await dao.findAssignmentsByCourseId(cid);
    res.json(assignments);
  };
  // Create assignment for a course
  const createAssignmentForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignment = { ...req.body, course: cid };
    // Ensure Mongoose generates a proper ObjectId
    if (assignment._id) delete assignment._id;
    try {
      const createdAssignment = await dao.createAssignment(assignment);
          res.status(201).json(createdAssignment);
      } catch (e) {
      res.status(400).send({ message: "Unable to create assignment", error: e?.message });
    }
  }; 

  const deleteAssignment = async (req, res) => {
     const { aid } = req.params;
        await dao.deleteAssignment(aid);
        res.sendStatus(204);
   }; 

  const updateAssignment = async (req, res) => { };   

  app.get("/api/courses/:cid/assignments", findAssignmentsByCourseId);
  app.post("/api/courses/:cid/assignments", createAssignmentForCourse);
  app.delete("/api/assignments/:aid", deleteAssignment);
  app.put("/api/assignments/:aid", updateAssignment);

  
  // Delete assignment by id (MongoDB)
  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    try {
      await model.deleteOne({ _id: aid });
      res.sendStatus(204);
    } catch (e) {
      res.status(400).send({ message: "Unable to delete assignment", error: e?.message });
    }
  });

  // Update assignment by id (MongoDB)
  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    try {
      const updated = await model.findByIdAndUpdate(aid, req.body, { new: true });
      if (!updated) return res.status(404).send({ message: "Assignment not found" });
      res.json(updated);
    } catch (e) {
      res.status(400).send({ message: "Unable to update assignment", error: e?.message });
    }
  });

  // Optional: keep old module-scoped routes temporarily for compatibility
  // app.get("/api/modules/:mid/assignments", ...);
  // app.post("/api/modules/:mid/assignments", ...);
}