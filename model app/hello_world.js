const express = require('express')
//import express from 'express';
const app = express()
const port = 3000
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})


app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//match root /root.text
app.get('/random.text',function(req,res){
  res.send('random.text')
})

//match abcd or acd
app.get('ab?cd',function(res,req){
  res.send('ab?cd')
})

//match abcd or abbcd or abbbcd and so on
app.get('ab+cd',function(res,req){
  res.send('ab+cd')
})

//match abrterycd or abSRTRcd or av4234cd and so on
app.get('ab*cd',function(res,req){
  res.send('ab*cd')
})


//match acd or abfcd
app.get('a(bf)?cd',function(res,req){
  res.send('a(bf)?cd')
})

//match anyting with a
app.get('/a/',function(res,req){
  res.send('/a/')
})


//match anything that ends with fly
app.get('/.*fly$/',function(res,req){
  res.send('/.*fly$/')
})
