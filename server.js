const app = require('express')();
const server = require('http').createServer(app);
const cron = require('node-cron');
// app.use(express.json());
const io = require('socket.io')(
  server
  , {
  cors:{
    origin: "*",
   // transports: ["websocket", "polling"],
   // methods: ["GET", "POST"]
  },
  // allowEIO3: true,
  // allowEIO4: true,
  // credentials: true,
}
);
// const hostname = '127.0.0.1';
// const port = 3000;
var scheduleTime = [
  {
    url:'https://youtu.be/m8aF3UA8Xck',
    time: "30 20 11 * * *",
  }
  // ,
  // {
  //   url:'https://youtu.be/unDdFNlamu4',
  //   time: "30 22 15 * * *"
  // },
  // {
  //   url:'https://youtu.be/gvtfhqOGUKA',
  //   time: "30 23 15 * * *"
  // },
  // {
  //   url:'https://youtu.be/pvk_DA7RXEI',
  //   time: "30 24 15 * * *"
  // },
  // {
  //   url:'https://youtu.be/ABVr8bVxE3c',
  //   time: "30 25 15 * * *"
  // }
]

// var scheduleTime = [

// ]

// var lastUpdate;
app.get('/getData', (req, res) => {
  console.log("START GET");
  // res.sendFile(__dirname + '/index.html');
  res.send("RESPOSE DATA");
});

app.post('/saveImageBase64', (req, res) => {
  var data = req.body;
  // res.sendFile(__dirname + '/index.html');
  console.log(req);
  res.send(data);
});

var historyBoxList = [];


createScheTime(scheduleTime);

io.on('connection', client => {
    console.log('user connected')
    io.sockets.emit("getHistoryBox", historyBoxList)
    // io.sockets.emit("messageBox", lastUpdate)

    client.on('message', function (message) {
        console.log("message: ", message);
        // { // example
        //   "username": res.username,
        //   "message": res.message,
        //   "timeStramp": this.getDateTime()
        // }
        // history.push(message);
        lastUpdate = message;
        io.sockets.emit("messageBox", message);
      })

      client.on('insertHistory', function (res) {
        historyBoxList.push(res)
      })

    client.on('editList', function (data) {
      scheduleTime = data
    })

    client.on('updateScheduleList', function () {
      console.log("updateSchedule");
      createScheTime(scheduleTime);
    })
    
    client.on('count', function (res) {
      io.sockets.emit("count", Date.now());
    })
    
    
    client.on('disconnect', () => {
        console.log('user disconnected')
    })

})



function createScheTime(sche) {
  if(sche) {
    if(sche.length != 0) {
      sche.forEach((data)=> {
        console.log(data.time);
        cron.schedule( data.time, function(){
          send(data); //emit
        },{
          scheduled: true,
          timezone: "Asia/Bangkok"
        }); 
      })
      // console.log(sche);
    }
  } else {
    // if(scheduleTime.length != 0) {
    //   scheduleTime.forEach((data)=> {
    //     console.log(data.time);
    //     cron.schedule( data.time, function(){
    //       send(data); //emit
    //     },{
    //       scheduled: true,
    //       timezone: "Asia/Bangkok"
    //     }); 
    //   })
    //   console.log(scheduleTime);
    // }
  }
}


function send(data) {
  console.log('running every  at : '+ data.time + '/' + new Date().toString());
  var autoMessage = {
    username: data.username || '--System--',
    message: data.url,
    timeStramp: new Date().toString()
  }
  // lastUpdate = autoMessage;  
  io.sockets.emit("messageBox", autoMessage)
}


server.listen( 8080, () => {
  console.log(`Server running at ${process.env.PORT}`);
});





