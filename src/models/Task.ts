import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
}, 
{ 
    timestamps: true, 
});

export default mongoose.model("tasks", taskSchema);