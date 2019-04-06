const Subject = require("../Models/subject"),
      express = require("express"),
      Student = require("../Models/student"),
      studentSubject = require("../Models/Student-Subject") ,
      subjecttRoute = express.Router();
//route *********************************************
subjecttRoute.get("/",async(req,rs)=>{ // list data
    let result = await Subject.find({}).catch(e=>rs.status(501).send("error "+e))
    rs.send(result)
 })

 subjecttRoute.get("/:id",async(req,rs)=>{ // details one 
    let result = await Subject.findById(req.params.id).catch(e=>rs.status(501).send("error "+e))
    if(!result) return rs.status(404).send("error not found the subject")
    rs.send(result)
 })
 subjecttRoute.get("/:id/students",async(req,rs)=>{ // details one 
    let result = await Student.find({subjects:req.params.id}).populate("subjects").catch(e=>rs.status(501).send("error "+e))
    if(!result) return rs.status(404).send("error not found the subject")
    rs.send(result)
 })
 subjecttRoute.get("/:id/studentsfilter",async(req,rs)=>{ // details one 
    let finalResult = []
    let result = await Student.find({subjects:req.params.id}).populate("subjects").catch(e=>rs.status(501).send("error "+e))
    if(!result) return rs.status(404).send("error not found the subject")
    for (let element of result) {
        let f = await studentSubject.findOne({student:element._id,subject:req.params.id})
        if(!f) finalResult.push(element)
        // console.log(finalResult)
    }
    console.log(finalResult)
    rs.send(finalResult)
 })

 subjecttRoute.post("/",async(req,rs)=>{ //insert new subject 
     let data = {
         'name':req.body.name,
         totalDegree:req.body.totalDegree,
     }
     let isValid = Subject.validate(data)
     if(isValid.error)
     {
        return rs.status(404).send("error not valid data"+isValid.error)
     }
     else
     {
         let subject = new Subject(data)
         subject = await subject.save().catch(e=>rs.status(501).send("error "+e))
       
         rs.status(200).send(subject)
     }


 })

 subjecttRoute.put("/:id",async(req,rs)=>{ //update subject 
    let data = {
        'name':req.body.name,
        totalDegree:req.body.totalDegree,
    }
    let isValid = Subject.validate(data)
    if(isValid.error)
    {
       return rs.status(404).send("error not valid data"+isValid.error)
    }
    else
    {
       
        let subject = await Subject.findByIdAndUpdate(req.params.id,data,{new:true})
                            .catch(e=>rs.status(501).send("error "+e))
        if(!subject) return rs.status(404).send("error not found")
        rs.status(200).send(subject)
    }


})

subjecttRoute.delete("/:id",async(req,rs)=>{ // delete subject
    let subject = await Subject.findByIdAndDelete(req.params.id)
                        .catch(e=>rs.status(501).send("error "+e))
    if(!subject) return rs.status(404).send("error not found")
    await Student.update({subjects:req.params.id},{$pull:{subjects:req.params.id}},{multi: true })
    await studentSubject.deleteMany({
        subject:req.params.id
    })
    rs.status(200).send({message:"delete sucess"})
 })
 module.exports = subjecttRoute