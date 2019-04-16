const StudentSubject = require("../Models/Student-Subject"),
      express = require("express"),
      degreeRoute = express.Router(),
      Student = require("../Models/student"),
      Subject = require("../Models/subject");
//route *********************************************
degreeRoute.get("/",async(req,rs)=>{ // get all degree
    let result  = await StudentSubject.find({})
                        .populate('subject').populate('student')
                        .catch(e=>rs.status(501).send("error "+e))
    rs.status(200).send(result)
    
                
} )
degreeRoute.get("/:id",async(req,rs)=>{ // get all degree for subject
    let result  = await StudentSubject.findById(req.params.id)
                        .populate('subject').populate('student')
                        .catch(e=>rs.status(501).send("error "+e))
    if(!result) return rs.status(404).send("error not found subject")
    rs.status(200).send(result)
                
} )
degreeRoute.get("/student/:id",async(req,rs)=>{ // get all degree for student
    let result  = await StudentSubject.find({student:req.params.id})
                        .populate('subject').populate('student')
                        .catch(e=>rs.status(501).send("error "+e))
    
    if(!result) return rs.status(404).send("error not found student")
    rs.status(200).send(result)
                
} )
degreeRoute.get("/subject/:id",async(req,rs)=>{ // get all degree for subject
    let result  = await StudentSubject.find({subject:req.params.id})
                        .populate('subject').populate('student')
                        .catch(e=>rs.status(501).send("error "+e))
    if(!result) return rs.status(404).send("error not found subject")
    rs.status(200).send(result)
                
} )
degreeRoute.get("/student/:stdId/subject/:subId",async(req,rs)=>{ // get all degree for student
    let result  = await StudentSubject.find({student:req.params.stdId,subject:req.params.subId})
                        .populate('subject').populate('student')
                        .catch(e=>rs.status(501).send("error "+e))
    
    if(!result) return rs.status(404).send("error not found student")
    rs.status(200).send(result)
                
} )
degreeRoute.post("/",async(req,rs)=>{
    let data = {
        student:req.body.student,
        subject:req.body.subject,
        degree:req.body.degree
    }
    let student = await Student.findById(req.body.student)
   
    if(!student) return rs.status(404).send("error not found student")
    let subject = await Subject.findById(req.body.subject)
    console.log(subject)
    if(!subject) return rs.status(404).send("error not found subject")
    const isvalid = StudentSubject.validate(data)
    if(isvalid.error)
    {
        return rs.status(404).send("error not valid data"+isvalid.error)
    }
    else
    {
        studentsubject = new StudentSubject(data)
        studentsubject = await studentsubject.save().catch(e=>rs.status(501).send("error "+e))
        studentsubject = await StudentSubject.findById(studentsubject._id)
                        .populate('subject').populate('student')
                        .catch(e=>rs.status(501).send("error "+e))
        rs.status(200).send(studentsubject)
    }
    
} )
degreeRoute.put("/:id",async(req,rs)=>{
    let data = {
        student:req.body.student,
        subject:req.body.subject,
        degree:req.body.degree
    }
    let student = await Student.findById(req.body.student)
   
    if(!student) return rs.status(404).send("error not found student")
    let subject = await Subject.findById(req.body.subject)
    console.log(subject)
    if(!subject) return rs.status(404).send("error not found subject")
    const isvalid = StudentSubject.validate(data)
    if(isvalid.error)
    {
        return rs.status(404).send("error not valid data"+isvalid.error)
    }
    else
    {
        
        studentsubject = await StudentSubject.findByIdAndUpdate(req.params.id,data,{new:true})
                            .populate('subject').populate('student')
                            .catch(e=>rs.status(501).send("error "+e))
        rs.status(200).send(studentsubject)
    }
    
} )

degreeRoute.delete("/:id",async(req,rs)=>{ // get all degree for subject
    let result  = await StudentSubject.findByIdAndRemove(req.params.id)
                        .catch(e=>rs.status(501).send("error "+e))
    if(!result) return rs.status(404).send("error not found subject")
    rs.status(200).send({message:"delete success"})
                
} )
module.exports = degreeRoute