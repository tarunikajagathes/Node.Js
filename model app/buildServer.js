const http=require('http');
const port=3000;
const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html')
    res.end('<h1>Hello,World</h1>')
})
server.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })

// const https = require('https')
// const options = {
//   hostname: 'dog.ceo',
//   port: 443,
//   path: '/api/breeds/list/all',
//   method: 'GET'
// }

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.end()

const path=require('path');
const text='/users/tarunika.jagathes/notes.txt';
console.log(path.dirname(text));
console.log(path.extname(text));
console.log(path.basename(text));

