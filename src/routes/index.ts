// routes/index.ts
import { Express } from "express";
import taskRoutes from "./taskRoutes";


export const router = (app: Express) => {
    // Use tasks routes
    app.use("/tasks", taskRoutes);
};