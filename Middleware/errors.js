module.exports = (error,request,response,next)=>{
    console.log(error)
    response.status(501).send("server error")
}
