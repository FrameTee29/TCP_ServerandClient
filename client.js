var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var client = new net.Socket();
client.connect(PORT,HOST,()=>{
    console.log('CONNECTED TO : ' + HOST + ':' + PORT);
    client.write('6035512080');
});

client.on('data',(data)=>{
    console.log('DATA: ' + data);
    if(data == 'BINGO' || data == 'END'){
        client.destroy();
    }
    else if(data=='OK'  || data=='WRONG'){
        let answer = Math.floor(Math.random()*21);
        client.write(answer+'');
    }
})

client.on('close',()=>{
    console.log('Connection closed');
})