import express from "express"
import {router} from "./routes"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import connectDatabase from "./config/mongoose"

//loading dotenv
dotenv.config({
    path : path.resolve(__dirname, "../.env")
})

//setting up express
const app = express()

// enable cors
app.use(cors())
app.use(cors({
    origin:true,
    exposedHeaders:["bearer"],
}))

//setting up json parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))


//DB connection
connectDatabase()

//setting up routes
router(app)

//setting up server port
let port = process.env.PORT || 2000


//starting server
app.listen(port, () => {
    console.log(`Listening at ${port}`)
})