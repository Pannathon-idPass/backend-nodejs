
import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';



const app = express(); 
const server = createServer(app); 
const socketio = new Server(server);

socketio.on('connection', client => {
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



createServer((req, res) => {
    res.write('Hello World!');
    res.end();
  }).listen(process.env.PORT || 3000);