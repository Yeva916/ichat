// const io = require('socket.io')(8000)

// const users={}

// io.on('connection',socket=>{
//     socket.on('new-user-joined',name=>{
//         users[socket.id] = name;
//         socket.
//     })
// })
// const {Server} =require('socket.io')
// const users = {}
// const io = new Server(8000);
const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

// Create an HTTP server and configure Socket.IO with CORS
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5500",  // Allow client requests from port 5500
    methods: ["GET", "POST"],         // Allow specific HTTP methods
    credentials: true                 // Allow credentials (cookies, etc.)
  }
});
const users={}
io.on('connection',(socket)=>{
    socket.on('new-user-joined',name=>{

        users[socket.id] = name
        socket.broadcast.emit('user-joined',name)
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })

})

server.listen(8000, () => {
    console.log('Server is running on port 8000');
  });