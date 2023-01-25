import { createServer } from 'http';

createServer((req, res) => {
  res.write('Hello World!');
  res.end();

const app = require('express')();
const http = require('http').Server(app);
http.listen(3000);

const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    }
});

var i = 0;




  app.get('/',(res)=> {
    console.log("GET");
  });

// app.use(cors);

io.on('connection', client => {
    console.log('user connected')


    // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
    client.on('message', function (message) {
        console.log("message: ", message);
        io.sockets.emit("messageBox", message)
    })
    
    // setInterval(()=> {
    //     io.sockets.emit("count",i++)
    // },1000)

    // เมื่อ Client ตัดการเชื่อมต่อ
    client.on('disconnect', () => {
        console.log('user disconnected')
    })

})

}).listen(process.env.PORT || 3000);
