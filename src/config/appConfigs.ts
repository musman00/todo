import path from "path"
import dotenv from "dotenv"



dotenv.config({
    path : path.resolve(__dirname,"../../.env")
})


interface ENV {
    PORT : number | undefined
    DB_URI : string | undefined
}


interface Config{
    PORT : number
    DB_URI : string
}


const getConfigs = () : ENV => {
    return {
        PORT : process.env.PORT ? Number(process.env.PORT) : undefined,
        DB_URI : process.env.DB_URI
    }
}


const getSantizedConfigs = (configs : ENV) : Config => {
    for (const [key,value] of Object.entries(configs)){
        if(value === undefined){
            throw new Error(`Missing key ${key} in .env`)
        }
    }

    return configs as Config
}


const configs = getConfigs()

const sConfigs = getSantizedConfigs(configs)


export default sConfigs