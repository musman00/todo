import mongoose from "mongoose";
import appConfigs from "./appConfigs";

export default async () => {
    // db connection
    mongoose.connect(appConfigs.DB_URI,{
        autoIndex : true,
        maxPoolSize : 10,
    })


    mongoose.connection.on("error" , (error : any) => {
        console.log(`Error while connecting to DB ${error}`)
    })


    mongoose.connection.on("connected" , (connected : any) => {
        console.log(`DB connected successfully.`)
    })
}