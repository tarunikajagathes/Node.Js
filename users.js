import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {
    decrypt,
    encrypt
} from './crypto.js';
import {
    parseJwt
} from './jwt.js';
var app = express();
app.use(cors());
app.use(express.json())
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
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: Object,
        require: true
    },
    creation_dt: {
        type: Date,
        require: true
    }
});
const User = mongoose.model('User', schema);
app.post("/signin", (req, res) => {
    if (typeof req.body.email == "string") {
        const data = {
            email: req.body.email,
            username: req.body.username,
            password: encrypt(req.body.password),
            creation_dt: Date.now()
        }
        User.insertMany([data]);
        res.send("added successfully")
    }
})
app.get('/email/:email', (req, res) => {
    let email_u = req.params.email;
    User.find({
        email: email_u
    }, function (err, user) {
        res.json(user);
    })
})

var schema1 = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    qty: {
        type: String
    },
    price: {
        type: Number
    }
});
const Bakerys = mongoose.model('Bakerys', schema1);
app.get('/bdata', async (req, res) => {
    var details = await Bakerys.find({});
    console.log(details);
    res.send(details);
})
const Fruits = mongoose.model('Fruits', schema1);
app.get('/data', async (req, res) => {
    await Fruits.find({}, function (err, details) {
        res.send(details);
    })
})
const Vegetables = mongoose.model('Vegetables', schema1);
app.get('/vdata', async (req, res) => {
    await Vegetables.find({}, function (err, details) {
        res.send(details);
        console.log(details);
    })
})

app.get('/user/:email/:password', async (req, res) => {
    let email_u = req.params.email;
    let pass_u = req.params.password;
    const data = await User.findOne({
        email: email_u
    }, function (err, user) {
        let pass = decrypt(user.password);
        if (pass_u == pass) {
            const token = jwt.sign({
                email_u
            }, 'my_secret_key');
            res.json({
                token: token
            });
        } else {
            // send status 401 Unauthorized
            res.sendStatus(401);
        }
    })
    // res.send("success")
})
var newSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true
    },
    items: Array
},{strict:true})
newSchema.index({
    email: 1
}, {
    unique: true
})
var UserItems = mongoose.model('UserItems', newSchema);
app.post('/user/insert/:token', async (req, res) => {
    var token_u = req.params.token;
    const decode = parseJwt(token_u);
    var arr = Object.values(decode);
    var value_u = {
        name: req.body.name,
        image: req.body.image,
        qty: req.body.qty,
        price: req.body.price
    };
const email_found=await UserItems.aggregate([{$match:{email:arr[0]}}]);
const fruit_found=await UserItems.aggregate([{$match:{"items.name":req.body.name}}]);
    if(email_found.length!=0&&fruit_found.length!=0)
    {
        await UserItems.updateOne({
                $and:[
                    {"items.name": req.body.name},
                    {email: arr[0]}
                ]
        },{$inc:{"items.$.qty": 1 }})
    }
    else if(email_found.length!=0)
    {
        await UserItems.findOneAndUpdate(
            {email:arr[0]},
            {$push:
                {items:value_u}
            }
        )
    }
    else{
    await UserItems.insertMany(
        {
        items:value_u,
        email:arr[0]
        }
    )}
    res.send("Successful");
}); 

app.post('/user/remove/:token',async(req,res)=>{
    var token_u = req.params.token;
    const decode = parseJwt(token_u);
    var arr = Object.values(decode);
    var u_name={name:req.body.name,image:req.body.image,qty:req.body.qty,price:req.body.price};
    await UserItems.findOneAndUpdate(
        {$and:[
            {"items.name": req.body.name},
            {email: arr[0]}
        ]},
        {$pull:
            {items:u_name}
        }
    )
    res.send("updated");
})

app.post('/user/basket/inc/:token',async(req,res)=>{
    var token_u = req.params.token;
    const decode = parseJwt(token_u);
    var arr = Object.values(decode);
    await UserItems.updateOne({
        $and:[
            {"items.name": req.body.name},
            {email: arr[0]}
        ]
    },{$inc:{"items.$.qty": 1 }})
    res.send("incremented");
})
app.post('/user/basket/dec/:token',async(req,res)=>{
    var token_u = req.params.token;
    const decode = parseJwt(token_u);
    var arr = Object.values(decode);
    await UserItems.updateOne({
        $and:[
            {"items.name": req.body.name},
            {email: arr[0]}
        ]
},{$inc:{"items.$.qty": -1 }})
res.send("decremented")

})
app.get('/details/:token', async (req, res) => {
    var t = req.params.token;
    const d = parseJwt(t);
    var a = Object.values(d);
    var details = await UserItems.find({
        email: a[0]
    }, {
        items: 1,
        _id: 0
    });
    res.send(details);
})
app.post('/user/basket/clearbasket/:token',async(req,res)=>{
    var token_s = req.params.token;
    const decode_value = parseJwt(token_s);
    var arr1 = Object.values(decode_value);
    await UserItems.deleteOne({email:arr1[0]});
    res.send("Deleted");
})
var Orders = mongoose.model('Orders', newSchema);
app.post('/user/basket/checkout/:token',async(req,res)=>{
    var token_s = req.params.token;
    const decode = parseJwt(token_s);
    var arr = Object.values(decode);
    const email_found=await UserItems.findOne({email:arr[0]});
    await Orders.insertMany({email:email_found.email,items:email_found.items});
    res.send("sucess");
})
app.get('/sort/:value',async(req,res)=>{
    const u_value=req.params.value;
    console.log(u_value)
    var sorted;
    if(u_value=="fhigh"){
        sorted=await Fruits.find({}).sort({price:-1})
    }
    else if(u_value=="flow"){
       sorted= await Fruits.find({}).sort({price:1});
    }
    else if(u_value=="vhigh"){
        sorted=await Vegetables.find({}).sort({price:-1})
    }
    else if(u_value=="vlow"){
       sorted= await Vegetables.find({}).sort({price:1});
    }
    else if(u_value=="bhigh"){
        sorted=await Bakerys.find({}).sort({price:-1})
    }
    else if(u_value=="blow"){
       sorted= await Bakerys.find({}).sort({price:1});
    }
    else{
        sorted="";
    }
    res.send(sorted);
})

app.get('/range/:value',async(req,res)=>{
    const u_value=req.params.value;
    var range;
    if(u_value=='f1-50'){
        range=await Fruits.find({$and:[{price:{$gte:1}},{price:{$lte:50}}]});
    }
    else if(u_value=='f51-100'){
        range=await Fruits.find({$and:[{price:{$gte:51}},{price:{$lte:100}}]});
    }
    else if(u_value=='f101-200'){
        range=await Fruits.find({$and:[{price:{$gte:101}},{price:{$lte:200}}]});
    }
    else if(u_value=='v1-50'){
        range=await Vegetables.find({$and:[{price:{$gte:1}},{price:{$lte:50}}]});
    }
    else if(u_value=='v51-100'){
        range=await Vegetables.find({$and:[{price:{$gte:51}},{price:{$lte:100}}]})
    }
    else if(u_value=='v101-200'){
        range=await Vegetables.find({$and:[{price:{$gte:101}},{price:{$lte:200}}]})
    }
    else if(u_value=='b1-50'){
        range=await Bakerys.find({$and:[{price:{$gte:1}},{price:{$lte:50}}]});
    }
    else if(u_value=='b51-100'){
        range=await Bakerys.find({$and:[{price:{$gte:51}},{price:{$lte:100}}]})
    }
    else if(u_value=='b101-200'){
        range=await Bakerys.find({$and:[{price:{$gte:101}},{price:{$lte:200}}]})
    }
    else{
        range="";
    }
    res.send(range);
})
app.get("/test",async(req,res)=>{
    const email_found=await Vegetables.find({price:{$gte:51},price:{$lte:100}})
    //var data={email:email_found.email,items:email_found.items};
    res.send(email_found);
})
app.listen(3000, () => {
    console.log("App Listening to 3000");
})


