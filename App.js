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


const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING); 

const app = express();

// Dynamic allow-list for credentialed CORS (no '*')
const STATIC_ALLOWED_ORIGINS = new Set([
  process.env.FRONTEND_URL,
  process.env.NETLIFY_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://kanbas-web-app2.netlify.app",
  "https://a6--kanbas-web-app2.netlify.app",
].filter(Boolean));

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // non-browser or same-origin
  if (STATIC_ALLOWED_ORIGINS.has(origin)) return true;
  try {
    const url = new URL(origin);
    // Allow Netlify deploy previews for this site: <preview>--kanbas-web-app2.netlify.app
    if (url.hostname.endsWith("--kanbas-web-app2.netlify.app")) return true;
  } catch (e) {
    return false;
  }
  return false;
};

// First, set CORS headers for ALL responses (including 404/500)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Also use cors middleware with dynamic origin validation for route handlers
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

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
