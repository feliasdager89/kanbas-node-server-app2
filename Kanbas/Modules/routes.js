//import db from "../Database/index.js"; 
import * as dao from "./dao.js" 

export default function ModuleRoutes(app) {  

  
  const findModuleByCourseId = async (req, res) => {
    const modules = await dao.findModuleByCourseId(req.params.cid);
    res.json(modules);
  };

  const findModuleById = async (req, res) => {
    const module = await dao.findModuleById(req.params.mid);
    res.json(module);
  };

  const createModule = async (req, res) => {
  try {
    const module = { ...req.body, course: req.params.cid }; // ✅ use 'course' now
    const newModule = await dao.createModule(module);
    res.json(newModule);
  } catch (err) {
    console.error("Error creating module:", err);
    res.status(400).send({ message: "Unable to create module", error: err.message });
  }
};

  const updateModule = async (req, res) => {
    const { mid } = req.params;
    try {
      const updated = await dao.updateModule(mid, req.body);
      if (!updated) {
        res.status(404).send({ message: "Module not found" });
        return;
      }
      res.json(updated);
    } catch (e) {
      res.status(400).send({ message: "Unable to update module", error: e?.message });
    }
  }; 

  const deleteModule = async (req, res) => {
    const { mid } = req.params;
    await dao.deleteModule(mid);
    res.sendStatus(204);
  };  

  //app.get("/api/courses/:cid/modules", findAllModules);
  app.get("/api/courses/:cid/modules", findModuleByCourseId);
  app.get("/api/modules/:mid", findModuleById);
  app.post("/api/courses/:cid/modules", createModule);
  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);

  /*
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.json(modules);
  }); 

  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(newModule);
  }); 

  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });

  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex(
      (m) => m._id === mid);
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex],
      ...req.body
    };
    res.sendStatus(204);
    });

} 
*/
}