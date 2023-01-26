const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const hostname = '127.0.0.1';
// const port = 3000;


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




server.listen( process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT || 3000}`);
});



