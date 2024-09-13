import { Router } from "express";
import TaskController from "../controllers/TaskController";
import { addTaskValidator, updateTaskValidator } from "../validators/TaskValidator";

const router = Router();

router.get("/", TaskController.viewAllTasks);

router.post("/", addTaskValidator, TaskController.addNewTask);

router.put("/:id", updateTaskValidator, TaskController.updateTask);

router.get("/:id", TaskController.viewSingleTask);

router.delete("/:id", TaskController.deleteTask);

export default router;
