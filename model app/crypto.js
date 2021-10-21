

function cb(){
    console.log('Processed in next iteration');
  }
  process.nextTick(cb);
  console.log('Processed in the first iteration');
// const crypto=require('crypto');
// const secret='abcdefg';
// const hash = crypto.createHmac('sha256', secret)
//                    .update('I love cupcakes')
//                    .digest('hex');
// console.log(hash);

// const crypto = require('crypto');
// const hash = crypto.createHash('sha256');

// hash.update('one');
// console.log(hash.copy().digest('hex'));

// hash.update('two');
// console.log(hash.copy().digest('hex'));

// hash.update('three');
// console.log(hash.copy().digest('hex'));
// console.log(hash.copy().digest('hex'));

//cluster
const cluster=require('cluster');
if(cluster.isWorker){
    console.log('Worker');
}
else{
    console.log('master');
    cluster.fork();
    cluster.fork();
}
