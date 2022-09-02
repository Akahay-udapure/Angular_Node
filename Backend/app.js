const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require("cors");
require('dotenv').config();

const app = express();

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/userdb", (err, res)=>{
    if(err)
        console.log('Error!',err);
    else
        console.log("Connected");
});

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

app.listen(process.env.PORT,() =>{
    console.log("Server is runninng on port "+process.env.PORT);
});