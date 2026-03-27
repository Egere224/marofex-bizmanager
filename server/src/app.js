import express from "express";
import cors from "cors";
import pool from './config/db.js';
import salesRoutes from "./modules/sales/sales.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import businessRoutes from "./modules/businesses/business.routes.js";
import productRoutes from "./modules/products/products.routes.js";
import customersRoutes from "./modules/customers/customers.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

import { errorMiddleware } from "./middleware/error.middleware.js";


const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get('/test-db', (req, res) => {
  console.log("🔥 HIT TEST ROUTE");
  res.send("WORKING!!!");
});

app.use("/api/businesses", businessRoutes);
app.use("/api/businesses/:businessId/sales", salesRoutes);
app.use("/api/businesses/:businessId/dashboard", dashboardRoutes);
app.use("/api/businesses/:businessId/customers", customersRoutes);
app.use("/api/businesses/:businessId/products", productRoutes);
app.use("/api/auth", authRoutes);



app.use(errorMiddleware);

// test route
app.get('/test-db', (req, res) => {
  console.log("🔥 HIT TEST ROUTE");
  res.send("WORKING!!!");
});

export default app;