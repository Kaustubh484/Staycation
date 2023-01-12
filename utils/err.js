export const errorGenerator=(errorStatus,errorMessage)=>{
const error = new Error();
error.status= errorStatus
error.message= errorMessage
return error
}