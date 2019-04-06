const joi = require("joi");
const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },
    mobile:
    {
        type:String,
        required:true,
        minlength:3,
        maxlength:100,
    },
    email:
    {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
    },
    subjects:[{ type: mongoose.Schema.Types.ObjectId,ref: 'Subject' }]  
})
const Student = mongoose.model("Student",studentSchema)
// validation 
function validateStudent(Student)
{
    const validSchema = {
        name:joi.string().required().min(3).max(255),
        mobile:joi.string().required().min(3).max(100),
        email:joi.string().email().required().min(3).max(255),
        subjects:joi.allow()
    }
    return joi.validate(Student, validSchema)
}
module.exports = Student;
module.exports.validate = validateStudent
module.exports.studentSchema = studentSchema