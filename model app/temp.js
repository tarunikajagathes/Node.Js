const express=require('express');
const app=express()
const port=3000;
 app.set('view engine','pug');
 app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  })
 app.listen(port,()=>{
     console.log(`Server running at port ${port}`);
 })