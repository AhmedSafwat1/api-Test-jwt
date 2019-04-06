// import lib 
const express = require("express"),
      mongoose = require("mongoose"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      port = process.env.port || 8080,
      cors = require("cors"),
      morgan = require("morgan")
//middlware *************************************************
const errorMidlware = require("./Middleware/errors");
//route *****************************************************
const studentRoute = require("./Routes/student"),
      subjectRoute = require("./Routes/subject"),
      degreeRoute =  require("./Routes/degree")
//midlware config *******************************************
app.use(bodyParser.json())//header date json 
app.use(bodyParser.urlencoded({ extended: true }))//header date form Url 
app.use(cors()) // for confilict the connect other server
app.use(morgan("tiny")) // for logger rote in the screen
app.use(express.static(path.join(__dirname, 'Public')))

// connect mongo ********************************************
mongoose.connect("mongodb://127.0.0.1:27017/AngularTask",{ useNewUrlParser: true })
.then(()=>console.log("connect to mongo"))
.catch((error)=>console.error("connect to mongo failed"))
//Route config ****************************8
app.use("/api/student",studentRoute)
app.use("/api/subject",subjectRoute)
app.use("/api/degree",degreeRoute)
//error middlware ********************************************
app.use(errorMidlware)
//Run server**************************************************
app.listen(port,()=>console.log(`server running ...  http://localhost:${port} `))
