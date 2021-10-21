const express= require('express');
const multer=require('multer');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());
const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/Users', {
    useNewUrlParser: true,

    useUnifiedTopology: true,

    useFindAndModify: false,

    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected");
});

var schema = new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    filename:{
        type:String
    },
    Date:{
        type:Date
    }
});
const File = mongoose.model('File', schema);

const fileStorage=multer.diskStorage({destination:(req,file,cb)=>{cb(null,"./uploads")},filename:(req,file,cb)=>{cb(null,file.originalname)}})
const upload = multer({ storage:fileStorage });
app.post('/stats', upload.single('file'), async function (req, res) {
    try{
        await File.insertMany(
        {
            Name:req.body.name,
            Email:req.body.email,
            filename:req.file.filename,
            Date:Date.now()
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
   res.status(200);
});
app.listen(5000,()=>{
    console.log("App running in port 5000");
})