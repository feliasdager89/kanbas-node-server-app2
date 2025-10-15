import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  // List assignments for a course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => String(a.course) === String(cid));
    res.json(assignments);
  });

  // Create assignment for a course
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignment = { ...req.body };
    assignment.course = cid;
    assignment._id = assignment._id ?? Date.now().toString();
    db.assignments.push(assignment);
    res.status(201).json(assignment);
  });

  // Delete by assignment id (unchanged)
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => String(a._id) !== String(aid));
    res.sendStatus(200);
  });

  // Update by assignment id (return updated object)
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const i = db.assignments.findIndex((a) => String(a._id) === String(aid));
    if (i < 0) return res.sendStatus(404);
    db.assignments[i] = { ...db.assignments[i], ...req.body };
    res.json(db.assignments[i]);
  });

  // Optional: keep old module-scoped routes temporarily for compatibility
  // app.get("/api/modules/:mid/assignments", ...);
  // app.post("/api/modules/:mid/assignments", ...);
}