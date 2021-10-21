const buf=Buffer.from('hey');
console.log(buf[0]," ",buf[1]," ",buf[2]);
console.log(buf.length);
for(let i of buf){
    console.log(i+" ");
}
buf.write('hi!');
console.log(buf[1]);
buf[1]=111;
console.log(buf.toString());