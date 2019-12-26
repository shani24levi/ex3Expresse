const mongoose = require('mongoose'); 
const { Schema, model } = require('mongoose');

const candidate_schema = new Schema({
    employeeId:{ type: Number, required: true},
    id: { type: Number, required: true}, 
    experience: { type: String, required: true } , 
    typeJob: { type: String, required:true  } , 
    experienceTime: { type: Number, required: true } , 
    degree: { type: String, required:true} 
}, { collection: 'candidates' });


const Candidate = mongoose.model( 'Candidate' , candidate_schema); 

module.exports = Candidate;