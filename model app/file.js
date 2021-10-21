const express= require('express');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

app.post('/value', function (req, res) {
    console.log("Hi");
 })
 
 app.listen(3000,()=>{
    console.log("App running in port 3000");
})