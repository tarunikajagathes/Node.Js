const express=require('express');
const app=express();
const port=3000;
// const admin = express() // the sub app

// admin.get('/', function (req, res) {
//   console.log(admin.mountpath) // /admin
//   res.send('Admin Homepage')
// })

// app.use('/admin', admin) // mount the sub app

 app.get('/',function(req,res){
    console.log(app.mountpath);
     res.send("Hello world");
 });

app.locals.title="My App";
console.dir(app.locals.title);

//diable
app.disable('foo');
console.log(app.get('foo'));
console.log(app.disabled('foo')); //diabled

app.enable('foo') //enable
console.log(app.get('foo'));
console.log(app.enabled('foo'));



app.listen(port,()=>{
    console.log(`App listening in port ${port}`);
})