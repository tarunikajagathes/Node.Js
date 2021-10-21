const url=require('url');
//legacy API
//const myUrl=new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
//WHATWG API
const myURL=url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');

//Constructing Method 1
const u=new URL('http://example.org'); //expample.org -> host
u.pathname='a/b/c';
u.search='?d=e';
u.hash='#fgh';
console.log(u.href);

//constructing method 2
const pathname1='a/b/c';
const search1='?d=e';
const hash1='#fgh'; //fragment portion
const u1=new URL(`http://example.org/${pathname1}${search1}${hash1}`)
console.log(u1.href);

//WHATWG API
const ur=new URL('/foo','http://example.org');
console.log(ur.href);
console.log(URL===require('url').URL); //
const UR = new URL('https://測試');
console.log(UR.href);  //converted to ASCII  using punycode algorithum
UR.hash='baz';
console.log(UR.hash); //gets and sets fragment portion of url
console.log("Host- ",ur.host); //gets and sets the host

const u2=new URL('http://example.org:81');
u2.hostname='example.com:82';  //will not change the port
console.log(u2.href); 
u2.host='example.com:82'; //change the port
console.log(u2.href);
console.log(u2.origin); //gives the origin
u2.password='123';  //sets te password
console.log(u2.href); 
console.log("protocol- ",u2.protocol); //prints the protocol
u2.protocol='fish'; //will not change from special to non-special protocol alternatively
console.log(u2.protocol);
u2.search='abc=~xyz';  //serach portion
console.log(u2.href);
u2.searchParams.sort(); //encodes to percent with specifications
console.log(u2.href);
u2.username='user'; //sets the username
console.log(u2.href);

//searchparams
u2.searchParams.set('abc','123');
u2.searchParams.get('abc');
let params = new URLSearchParams({
    user: 'abc',
    query: ['first', 'second']
  });
  console.log(params.getAll('query'));  // Prints [ 'first,second' ]
  console.log(params.toString());  // Prints 'user=abc&query=first%2Csecond'

const map=new Map();
map.set('user','345');
map.set('query','hello');
params=new URLSearchParams(map);
console.log(params.toString());
console.log(url.domainToASCII('español.com'));