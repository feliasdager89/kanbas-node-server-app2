//import Database from "../Database/index.js"; 
import * as dao from "./dao.js"; 


export default function CourseRoutes(app) {   

const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };

  const deleteCourse = async (req, res) => {
    const { id } = req.params;
    await dao.deleteCourse(id);
    res.sendStatus(204);
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.id);
    res.json(course);
  }; 

  const findCourseByName = async (req, res) => {
    const course = await dao.findCourseByName(req.params.name);
    res.json(course);
  };

  const findCourseByCode = async (req, res) => {
    const course = await dao.findCourseByCode(req.params.code);
    res.json(course);
  };  

  const deleteCourseById = async (req, res) => {
    const { id } = req.params;
    await dao.deleteCourse(id);
    res.sendStatus(204);
  };

  const updateCourse = async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await dao.updateCourseAndReturn(id, req.body);
      if (!updated) {
        res.status(404).send({ message: "Course not found" });
        return;
      }
      res.json(updated);
    } catch (e) {
      res.status(400).send({ message: "Unable to update course", error: e?.message });
    }
  };


/*
app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });


 app.post("/api/courses", (req, res) => {
    const course = { ...req.body,
      _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });


  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

}
*/

  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:id", findCourseById);
  app.get("/api/courses/name/:name", findCourseByName);
  app.get("/api/courses/code/:code", findCourseByCode);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourseById);

}

