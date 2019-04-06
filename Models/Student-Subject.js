const joi = require("joi"),
      mongoose = require("mongoose"),
      studentSubjectSchema = new mongoose.Schema({
          "subject":{
             type:mongoose.Schema.Types.ObjectId,
             ref: 'Subject' ,
             require:true
          },
          student:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Student'  ,
            require:true
          },
          degree:{
              type:Number,
              required:true,
          }
      }),
      StudentSubject = mongoose.model("StudentSubject",studentSubjectSchema);
function validationStudentSubject(studentSubject)
{
    schemaValid = {
        subject:joi.required(),
        student:joi.required(),
        degree:joi.number().required()

    }
    return joi.validate(studentSubject,schemaValid)
}
module.exports = StudentSubject
module.exports.validate = validationStudentSubject
module.exports.studentSubjectSchema = studentSubjectSchema