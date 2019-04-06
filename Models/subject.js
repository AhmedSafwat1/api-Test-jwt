const joi = require("joi"),
      mongoose = require("mongoose"),
      subjectSchema = new mongoose.Schema({
          "name":{
              type:String,
              require:true,
              minlength:2,
              maxlength:255
          },
          totalDegree:{
              type:Number,
              required:true,
              minlength:50,
              maxlength:100
          }
      }),
      Subject = mongoose.model("Subject",subjectSchema);
function validationSubject(subject)
{
    schemaValid = {
        name:joi.string().min(2).max(255).required(),
        totalDegree:joi.number().min(50).max(100).required()
    }
    return joi.validate(subject,schemaValid)
}
module.exports = Subject;
module.exports.validate = validationSubject
module.exports.subjectSchema = subjectSchema
