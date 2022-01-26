const express = require("express"); // Access
const socket = require("socket.io");

const app = express(); // Initialized and server ready

app.use(express.static("UI"));

let port = process.env.PORT || 3000;
let server = app.listen(port, ()=>{
    console.log("Listening to port "+ port);
})

let io = socket(server);

io.on("connection", (socket)=>{
    console.log("Made socket connection");

    // data received on server from frontend
    socket.on("beginPath", (data)=>{
        // data --> received from frontend
        // Transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data)=>{

        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data)=>{
        io.sockets.emit("redoUndo", data);
    })
})
