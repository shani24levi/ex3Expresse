const mongoose = require( 'mongoose'); 
const Candidate = require('./model/Candidate');
const path = require('path');


const { DB_USER, DB_PASS, DB_HOST } =require('./consts');
const url =`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const options ={ useNewUrlParser: true, useCreateIndex: true, user: DB_USER, pass: DB_PASS }
mongoose.connect(url, options);

module.exports ={ 
    getAllCandidate( req, res, next) {
        mongoose 
        .connect(url, options)
        .then(async ()=>{
            const result = await Candidate.find({}); 
            if(result) {res.json(result);
                res.send(result);}
            else res.status(404).send('not found'); 
        })        
        .catch(err => { 
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        })
    },
    getCandidate(req, res, next) { 
        mongoose 
        .connect(url, options) 
        .then(async  ()=> { 
            const {id =null} =req.params; 
            const result =await Candidate.findOne({id}); 
            if (result) {res.json(result);
                res.send(result);}
            else res.status(404).send('not found');
        })
        .catch(err =>{
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        })
    },
    editCandidate(req, res, next) { 
        mongoose 
        .connect(url, options) 
        .then(async ()=>{ 
            const {idEdite}= req.params.id;
            const {experience=null,experienceTime=null,typeJob=null,employeeId=null,degree=null} =req.body; 
            const result = await Candidate.updateOne(
                {id: req.params.id }, 
                {$set: {experience: req.body.experience} },
                {$set: {experienceTime: req.body.experienceTime} },
                {$set: {typeJob: req.body.typeJob} },
                {$set: {degree: req.body.degree} }
            );
            res.status(200).json(result);
            res.send(result);
        })
        .catch(err =>{
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        })
    },
    addCandidate(req, res, next) {
        console.log(req.body);

        var item =new Candidate({
            employeeId: req.body.employeeId,
            id: req.body.id,
            experience: req.body.experience,
            typeJob: req.body.typeJob ,
            experienceTime: req.body.experienceTime,
            degree: req.body.degree
        });
    
        var newId= req.body.id;
        item.save()
        .then(data=> {
            if (!Candidate.find({newId})){
                res.status(200).json(data);
                res.send('candidat Added!');
            }
            else
                res.status(404).send('candidat is allrasy exsist!');
        })
        .catch(err =>{
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        })
     },

     removeCandidate(req, res, next) {
        mongoose 
        .connect(url, options) 
        .then(async ()=> {
            const {idRemove} =req.params.id; 
            const removeIt = await Candidate.deleteOne({idRemove}); 
            //console.log(idRemove);       
            res.status(200).json(removeIt);
        })
        .catch(err =>{
            console.error( 'some error occurred', err) 
            res.status(500).send(err.message); 
        })
     }
} 

