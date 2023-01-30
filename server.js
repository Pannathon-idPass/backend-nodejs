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
    url:'https://youtu.be/HTHpkQJ3pVI',
    time: "30 21 15 * * *",
  },
  {
    url:'https://youtu.be/unDdFNlamu4',
    time: "30 22 15 * * *"
  },
  {
    url:'https://youtu.be/gvtfhqOGUKA',
    time: "30 23 15 * * *"
  },
  {
    url:'https://youtu.be/pvk_DA7RXEI',
    time: "30 24 15 * * *"
  },
  {
    url:'https://youtu.be/ABVr8bVxE3c',
    time: "30 25 15 * * *"
  }
]


var lastUpdate;


createScheTime();

io.on('connection', client => {
    console.log('user connected')
    

    io.sockets.emit("messageBox", lastUpdate)

    // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
    client.on('message', function (message) {
        console.log("message: ", message);
        // { // example
        //   "username": res.username,
        //   "message": res.message,
        //   "timeStramp": this.getDateTime()
        // }
        lastUpdate = message;
        io.sockets.emit("messageBox", message);
    })

    client.on('addList', function (add) {
      scheduleTime.push({
        url: add.url,
        time: add.time,
        createBy: add.username
      });
      createScheTime();
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


function createScheTime() {
  if(scheduleTime.length != 0) {
    scheduleTime.forEach((data)=> {
      console.log(data.time);
      cron.schedule( data.time, function(){
        send(data); //emit
      },{
        scheduled: true,
        timezone: "Asia/Bangkok"
      }); 
    })
    console.log(scheduleTime);
  }
}

function send(data) {
  console.log('running every  at : '+ data.time + '/' + new Date().toString());
  var autoMessage = {
    username: data.username || '--System--',
    message: data.url,
    timeStramp: new Date().toString()
  }
  lastUpdate = autoMessage;
  io.sockets.emit("messageBox", autoMessage)
}


server.listen( process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT || 3000}`);
});



