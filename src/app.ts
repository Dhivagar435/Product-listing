
import express from "express";
import "./inversionOfControl/di-container";
import cors, { CorsOptions } from "cors";
import compression from "compression";
import path from "path";
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerconfiguration");
import dotenv from "dotenv";
import { globalErrorHandler } from "./constant/error/Global.error";
dotenv.config();

//staffmanagement
import staffManagementRoutes from "./superAdmin/staff/routes/Staff.routes"

//admissionPattern 

import admissionPattern from "./admissionPattern/routes/AdmissionPatternRoutes"

//academicYear

import academicyear from "./academicYear/routes/Academic.routes"


const app = express();
app.use(compression());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    explorer: true,
  })
);

const allowedOrigins: string[] =
  process.env.ALLOWED_ORIGINS?.split(",").map(o => o.trim()) ?? [];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Request-ID",
    "Idempotency-Key",
  ],
  credentials: true,
};
app.use((req, res, next) => {
  if (!req.path.startsWith("/v1/uploads")) {
    res.setHeader("Content-Type", "application/json");
  }

  res.setHeader("Cache-Control", "no-store");

  next();
});

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.set("trust proxy", true);


//staffmanagement
app.use("/api/v1/staff", staffManagementRoutes)


//admissionpattern

app.use("/api/v1/admissionPattern", admissionPattern)

//academicyear
app.use("/api/v1/academicYear", academicyear)


app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("SCHOOL BACKEND");
});

export default app;
