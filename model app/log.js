const { Console } = require('console')

const obj = {
    name: 'joe',
    age: 35,
    person1: {
      name: 'Tony',
      age: 50,
      person2: {
        name: 'Albert',
        age: 21,
        person3: {
          name: 'Peter',
          age: 23
        }
      }
    }
  }
  console.log(obj)
  
  console.log(JSON.stringify(obj, null, 2))

  require('util').inspect.defaultOptions.depth = null
console.log(obj)



//console
const fs=require('fs');
console.log("hello world"); //prints the line
//console.error(new Error('error occured')); //prints the error message

//custom console
const output=fs.createWriteStream('./stdout.log');
const errorOutput=fs.createWriteStream('./stderr.log');
const logger=new Console({stdout:output,stderr:errorOutput});
logger.log("Hello From custom logger!!");
const count=5;
logger.log('%d',count);


console.assert(); //prints assertion failed
console.assert(true); //nothing happens

console.count();
console.count('default');
console.count('abc');

console.countReset('abc');
console.count('abc');

console.table([{a:1,b:'y'},{a:'z',b:2}]);
console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ['a']);