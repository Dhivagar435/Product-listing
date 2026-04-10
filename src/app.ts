
import express from "express";
import "./inversionOfControl/di-container";
import cors, { CorsOptions } from "cors";
import compression from "compression";
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerconfiguration");
import dotenv from "dotenv";
import path from 'path';
import { globalErrorHandler } from "./constant/error/Global.error";

dotenv.config();

//brand

import brandRoutes from "./modules/brand/routes/brand.routes";

//category

import categoryRoutes from "./modules/category/routes/category.routes";


//product

import productRoutes from "./modules/products/routes/product.routes";


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
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Request-ID",
    "Idempotency-Key",
  ],
  credentials: true,
};


app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.set("trust proxy", true);

// const uploadsPath = path.resolve(__dirname, '../uploads');

const uploadsPath = path.join(process.cwd(), "uploads");


app.use("/api/uploads", express.static(uploadsPath));


//brand
app.use("/api/brands", brandRoutes)


//category

app.use("/api/categories", categoryRoutes)


//product

app.use("/api/products", productRoutes)


app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("SCHOOL BACKEND");
});

export default app;
