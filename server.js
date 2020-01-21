var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var i= 0;
var server = net.createServer();
server.listen(PORT, HOST);
server.on('connection', (sock) => {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    
    sock.on('data', (data) => {
        console.log('DATA ' + sock.remoteAddress + ':=> ' + data);
        console.log(i++);
        if (i == 1 || i==0) {
            sock.write(' OK ');
        }
        if(i !== 6){
            if (data == Math.floor(Math.random() * 21)) {
                i=0;
                sock.write('BINGO');
            }
            else {
                sock.write('WRONG');
            }
        }
        else{
            i=0;
            sock.write('END');
            
        }
    })

    sock.on('error',()=>{
        console.log("ERROR");
    })

    sock.on('close', function (data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
})


