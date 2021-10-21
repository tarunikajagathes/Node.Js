const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors=require('cors');
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected");
});
const kittySchema = new mongoose.Schema({
    name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);
app.post("/lists", (req, res) => {
    const data = {
        name: req.body.name
    }
    Kitten.insertMany([data]);
    res.send("added successfully")
})
app.get("/list", (req,res) => {

    Kitten.find({name:"meow"},(err,result) => {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(3000, () => {
    console.log("App listening to port 3000");
})