const jwt = require("jsonwebtoken");
module.exports = (request,response,next)=>{
    console.log(request.headers)
    const bearHeader = request.headers["authorization"]
    if(typeof bearHeader !== "undefined")
    {
        const bear = bearHeader.split(" ");
        const bearToken = bear[0];
        request.token = bearToken;
        jwt.verify(request.token,"mykey",(err,data)=>{
            if(err)
            {
                response.sendStatus(403)
            }
            else
            {
                // console.log(data);
                request.user = data;
                // console.log(request)
                next()
            }
        })
        
    }
    else
    {
        response.sendStatus(403)
    }
}
