export default {

    buildSuccessResponse(
        data : any | undefined,
        message : String = "Actions successfull",
        code : number = 200
    ) : any {
        return {
            successful : true,
            code : code,
            message : message,
            data : data
        }
    },


    buildErrorResponse(
        error : any | undefined,
        message : String = "Error occurred",
        code : number = 400
    ) : any {
        return {
            successful : false,
            code : code,
            message : message,
            error : error
        }
    },


    buildFieldMissingResponse(
        filedName : String,
        data : any = undefined
    ) : any {
        return {
            successful : false,
            code : 400,
            message : `${filedName} is required.`,
            data : data
        }
    }


}