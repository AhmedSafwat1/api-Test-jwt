const Student = require("../Models/student"),
      express = require("express"),
      mongoose = require("mongoose"),
      studentRoute = express.Router(),
      Subject = require("../Models/subject"),
      studentSubject = require("../Models/Student-Subject") ;
//route *********************************************
studentRoute.get("/",async(req,rs)=>{ // list data
   let result = await Student.find({}).populate('subjects').catch(e=>rs.status(501).send("error "+e))
   rs.status(200).send(result)
   
})

studentRoute.get("/:id",async(req,rs)=>{ // show details
    let result = await Student.findById(req.params.id).populate('subjects').catch(e=>rs.status(501).send("error "+e))
    if(!result) return rs.status(404).send("not found this Stduent")
    rs.status(200).send(result)
 })

studentRoute.post("/",async(req,rs)=>{ // insert new student
    let data = {
        'name':req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        subjects:req.body.subjects

    }
    const isvalid = Student.validate(data)
    if(isvalid.error)
    {
        return rs.status(404).send("error not valid data"+isvalid.error)
    }
    else
    {
        let student = new Student(data)
        student  = await student.save().catch(e=>rs.status(501).send("error "+e))
        student = await Student.findById(student._id).populate('subjects').catch(e=>rs.status(501).send("error "+e))
        console.log(student)
        rs.status(200).send(student)
    }
 })

 studentRoute.put("/:id/subject",async(req,rs)=>{ // insert new student
    console.log(req.body)
    let data = {
        
        subjects:req.body.subjects,
        subjects2:[],

    }
    await data.subjects.forEach(element => {
        try {
            data.subjects2.push(mongoose.Types.ObjectId(element))
        } catch (error) {
            return rs.status(404).send("error not found subject data")
        }
       
    });
  
    if(await checkValidSubject(data.subjects2))
    {
        console.log("hi")
        return rs.status(404).send("error not found subject data")
    }
    else
    {
        
        let student2  = await Student.findByIdAndUpdate(req.params.id,{
            $addToSet:{subjects:{ $each:data.subjects2}}
        },{new:true}).populate('subjects').catch(e=>rs.status(501).send("error "+e))
        if(!student2) return rs.status(404).send("error not found")
        rs.send(student2)
    }
 })
 studentRoute.put("/:id",async(req,rs)=>{ // insert new student
    console.log(req.body)
    let data = {
        'name':req.body.name,
        mobile:req.body.mobile,
        email:req.body.email

    }
    const isvalid = Student.validate(data)
    if(isvalid.error)
    {
        return rs.status(404).send("error not valid data"+isvalid.error)
    }
    else
    {
        let student = await Student.findByIdAndUpdate(req.params.id,data,{new:true}).populate('subjects')
                            .catch(e=>rs.status(501).send("error "+e))
        if(!student) return rs.status(404).send("error not found")
        rs.send(student)
    }
 })
 studentRoute.delete("/:id",async(req,rs)=>{ // delete student
    let student = await Student.findByIdAndDelete(req.params.id)
                        .catch(e=>rs.status(501).send("error "+e))
    if(!student) return rs.status(404).send("error not found")
    await studentSubject.deleteMany({
        student:req.params.id
    })
    rs.status(200).send({message:"delete sucess"})
 })
 async function checkValidSubject(subjects2)
{
    console.log("===================")
    flag = false;
    await subjects2.forEach(async(e)=>{
        
        let s  = await Subject.findById(e).catch(e=>throws ("error "+e))
        console.log(s)
        if(!s) {console.log(s + "ss");flag= true}
       
    })
    return flag
}
module.exports = studentRoute;