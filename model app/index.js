const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();

app.get('/api',function(req,res){
    res.json({
        'text':'my api'
    });
});

app.get('/api/protected',ensureToken,function(req,res){
    res.json({
        'text':'This is protected',
    });
});

function ensureToken(req,res,next){
    const bearerHeader=req.headers["authorization"];
    if(typeof bearerHeader !=='undefined')
    {
        const bearer=bearerHeader.split(" ");
        const bearerToken=bearer[1];
        req.token=bearerToken;
        jwt.verify(req.token,'my_secret_key',function(err){
            if(err){
                res.sendStatus(403);
            }
            else{
               next();
            }
        })
    }
    else{
        res.sendStatus(403);
    }
}

app.post('/api/login',function(req,res){
    //auth user
    const user={id:3};
    const token=jwt.sign({user},'my_secret_key');
    res.json({
        token:token
    });
});

app.listen(3000,function()
{
    console.log("App listening in port 3000");
});