// var request = require('request');
// var fs = require('fs');

// var r = request.post("http://server.com:3000/");
// var upload = fs.createReadStream('public', { highWaterMark: 500 });

// upload.pipe(r);

// var upload_progress = 0;
// upload.on("data", function (chunk) {
//   upload_progress += chunk.length
//   console.log(new Date(), upload_progress);
// })

// upload.on("end", function (res) {
//   console.log('Finished');
// })

const express = require('express')
const multer=require('multer');
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const fileStorage=multer.diskStorage({destination:(req,file,cb)=>{cb(null,"C:/Users/tarunika.jagathes/Node.Js/public/data/uploads")},filename:(req,file,cb)=>{cb(null,Date.now()+"-"+file.originalname)}})
const upload = multer({ storage:fileStorage })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/uploads', upload.single('uploaded_file'), (req, res) => {
    res.json({
        'message': 'File uploaded succesfully.'
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))