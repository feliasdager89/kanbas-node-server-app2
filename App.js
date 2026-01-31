import express from 'express' 
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js' 
import cors from "cors"; 
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js'; 
import mongoose from 'mongoose';
import UserRoutes from './Kanbas/Users/routes.js'; 
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();


const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING);
const app = express();

// Allow Vite (5173) and CRA (3000) locally, plus deployed URL(s)
app.use(cors({
  credentials: true,
  origin: [
    process.env.FRONTEND_URL,   // e.g., https://your-frontend.netlify.app
    process.env.NETLIFY_URL,
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:3001", 
    'https://kanbas-web-app2.netlify.app',
    'https://a6--kanbas-web-app2.netlify.app'
  ].filter(Boolean),
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
}; 

// Only set secure, SameSite=None in production (Render)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    // optional if you use a custom domain
    domain: process.env.NODE_SERVER_DOMAIN || undefined,
  };
}


app.use(
  session(sessionOptions)
);

app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app); 
AssignmentRoutes(app);
Hello(app)
Lab5(app)

app.listen(process.env.PORT || 4000)
