const { body, param } = require('express-validator');


 export const  addTaskValidator = [

    body("title").isString().withMessage("Title must be a string").notEmpty().withMessage("Title cannot be empty"),

    body("description").isString().withMessage("Description must be a string").notEmpty().withMessage("Description cannot be empty"),

]


export const  updateTaskValidator = [

    param("id").isString().withMessage("id must be a number").notEmpty().withMessage("id cannot be empty"),

    body("title").optional().isString().withMessage("Title must be a string"),

    body("description").optional().isString().withMessage("Description must be a string"),

]