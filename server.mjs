// import { createServer } from 'http';
// import { io } from 'socket.io';



const app = require('express')();
const http = require('http').Server(app);

app.get('/',(res) => {
  console.log("GET /");
})







http.listen( process.env.PORT || 3000)





// const io = require("socket.io");

// io.on('connection', client => {
//     console.log('user connected')


//     // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
//     client.on('message', function (message) {
//         console.log("message: ", message);
//         io.sockets.emit("messageBox", message)
//     })
    
//     // setInterval(()=> {
//     //     io.sockets.emit("count",i++)
//     // },1000)

//     // เมื่อ Client ตัดการเชื่อมต่อ
//     client.on('disconnect', () => {
//         console.log('user disconnected')
//     })

// })



// createServer((req, res) => {
// //   res.write('Hello World!');
// //   res.end();
// }).listen(process.env.PORT || 3000);

