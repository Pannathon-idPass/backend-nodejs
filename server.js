const app = require('express')();
const server = require('http').createServer(app);
const cron = require('node-cron');

const io = require('socket.io')(server, {
  cors:{
    origin: "*"
  }
});
// const hostname = '127.0.0.1';
// const port = 3000;
var scheduleTime = [
  {
    url:'https://youtu.be/unDdFNlamu4',
    time: "30 8 14 * * *"
  },
  {
    url:'https://youtu.be/gvtfhqOGUKA',
    time: "0 9 14 * * *"
  },
  {
    url:'https://youtu.be/pvk_DA7RXEI',
    time: "0 10 14 * * *"
  },
  {
    url:'https://youtu.be/ABVr8bVxE3c',
    time: "0 11 14 * * *"
  }
]

scheduleTime.forEach((time)=> {
  console.log(time.time);
  cron.schedule( time.time, function(){
    console.log('running every  at : '+ time.time + '/' + new Date().toString());
    var autoMessage = {
      username: '--System--',
      message: time.url,
      timeStramp: new Date().toString()
    }
    io.sockets.emit("messageBox", autoMessage)
  },{
    scheduled: true,
    timezone: "Asia/Bangkok"
  }); 
})


io.on('connection', client => {
    console.log('user connected')
    
    

    // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
    client.on('message', function (message) {
        console.log("message: ", message);
        io.sockets.emit("messageBox", message)
    })

    client.on('addList', function (add) {
      scheduleTime.push({
        url: ''
      });
      // console.log("message: ", message);
      // io.sockets.emit("messageBox", message)
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



