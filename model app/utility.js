const dotenv = require('dotenv').config();
const util = require('util');
const fs=require('fs');
const debuglog = util.debuglog('foo');

//util.debulog
debuglog('hi there, it\'s foo [%d]', 2333);
const enabled=util.debuglog('foo-bar').enabled;
if(enabled){
    console.log("Hello foo-bar [%d]",344);
}

//util.deprecate
const fn1=util.deprecate(()=>{console.log("Inside the deprecated function")},'DEp001');
const fn2=util.deprecate(()=>{console.log("Inside the deprecated function")},'DEp002');
fn1();
fn2();

//util.format
console.log(util.format('%s:%s', 'foo'));

//util.formatWithOptions
console.log(util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 }));

//util.callbackify
async function fn() {
  return 'hello world';
}
const callbackFunction = util.callbackify(fn);
callbackFunction((err, ret) => {
    if (err) throw err;
    console.log(ret);
  });


//util.getSystemErrorMap()
  fs.access('file/that/does/not/exist', (err) => {
    const errorMap = util.getSystemErrorMap();
    const name = errorMap.get(err.errno);
    console.error(name);  // ENOENT
  });