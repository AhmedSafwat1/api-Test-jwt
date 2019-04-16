const  express = require("express"),
       AuthRoute = express.Router()
       jwt = require("jsonwebtoken");

AuthRoute.post("/",async (req,rs)=>{
    user = {id:3};
    const token = await jwt.sign(user,"mykey");
    rs.send({
        token:token
    })
})

module.exports = AuthRoute;