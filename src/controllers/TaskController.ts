import { Request, Response } from "express";
import responseBuilder from "../utils/responseBuilder";
const { validationResult } = require('express-validator');
import TaskModel from "../models/Task";
import Task from "../interfaces/TaskInterface";

// get all tasks
const viewAllTasks = async (request: Request, response: Response) => {
    try {
        TaskModel.find().then((tasks) => {
            if (tasks.length == 0) {
                return response.send(responseBuilder.buildErrorResponse(undefined, "No task found."))
            }

            return response.send(responseBuilder.buildSuccessResponse(tasks, "Tasks retrived successfully."))
        }).catch((error) => {
            return response.send(responseBuilder.buildErrorResponse(error, "Error occurred while retriving tasks."))
        })
    }
    catch (error) {
        return response.send(responseBuilder.buildErrorResponse(error, "Server error occurred", 500))
    }
}

// add new task
const addNewTask = async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).send(responseBuilder.buildErrorResponse(errors.array(), "Validation error", 400));
        }

        let {
            title,
            description,
            completed
        } = request.body

        new TaskModel({
            title: title.trim(),
            description: description.trim(),
            completed: completed ? completed : false
        }).save().then((task) => {
            return response.send(responseBuilder.buildSuccessResponse(task, "Task created successfully."))
        }).catch((error) => {
            return response.send(responseBuilder.buildErrorResponse(error, "Error occurred while adding new task"))
        })
    }
    catch (error) {
        console.log(error)
        return response.status(500).send(responseBuilder.buildErrorResponse(error, "Server error occurred", 500))
    }
}
// get single task
const viewSingleTask = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        TaskModel.findOne({ _id: id }).then((task) => {
            if (!task) {
                return response.send(responseBuilder.buildErrorResponse(undefined, "Task not found."));
            }
            return response.send(responseBuilder.buildSuccessResponse(task, "Task retrived successfully."));
        }).catch((error) => {
            return response.send(responseBuilder.buildErrorResponse(error, "Error occurred while retriving task."));
        })
    }
    catch (error) {
        return response.send(responseBuilder.buildErrorResponse(error, "Server error occurred", 500))
    }
}

// update task
const updateTask = async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).send(responseBuilder.buildErrorResponse(errors.array(), "Validation error", 400));
        }

        const { id } = request.params;
        const { title, description, completed } = request.body as Partial<Task>;

        const updateFields: Partial<Task> = {};

        if (title) {
            updateFields.title = title.trim();
        }

        if (description) {
            updateFields.description = description.trim();
        }

        if (typeof completed === 'string') {
            updateFields.completed = completed === 'true';
        } else if (typeof completed === 'boolean') {
            updateFields.completed = completed;
        }
        
        const task = await TaskModel.findOneAndUpdate(
            { _id: id },
            updateFields,
            { new: true }
        );

        if (!task) {
            return response.status(404).send(responseBuilder.buildErrorResponse(undefined, "Task not found.", 404));
        }
        return response.send(responseBuilder.buildSuccessResponse(task, "Task updated successfully."));

    } catch (error) {
        console.error(error);
        return response.status(500).send(responseBuilder.buildErrorResponse(error, "Server error occurred", 500));
    }
}

// delete task
const deleteTask = async (request: Request, response: Response) => {
    try {

        const { id } = request.params;

        TaskModel.findOneAndDelete({
            _id: id,
        }).then((task) => {

            if (!task) {
                return response.send(responseBuilder.buildErrorResponse(undefined, "No task found."))
            }

            return response.send(responseBuilder.buildSuccessResponse(task, "Task deleted successfully."))
        }).catch((error) => {
            return response.send(responseBuilder.buildErrorResponse(error, "Error occurred while deleting task."))
        })


    } catch (error) {
        return response.status(500).send(responseBuilder.buildErrorResponse(error, "Server error occurred", 500));
    }
};

export default {
    viewAllTasks,
    addNewTask,
    viewSingleTask,
    updateTask,
    deleteTask
}