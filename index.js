const express = require('express');
const ctrl =require('./controller');
const bodyparser = require('body-parser');

const app =express();
const port = process.env.PORT || 3000 ;

app.use(bodyparser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}))


app.get( '/candidate', ctrl.getAllCandidate) 
app.get( '/candidate/:id', ctrl.getCandidate) 
app.put( '/candidate/:id', ctrl.editCandidate) 
app.post( '/candidate' ,ctrl . addCandidate) 
app.delete( '/remove/:id' , ctrl.removeCandidate) 

app.listen(port, () => console.log('Express server is running on port ', port));

