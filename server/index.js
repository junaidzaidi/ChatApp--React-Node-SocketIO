const express = require('express');
const http = require('http')
const cors = require('cors')
const port = process.env.PORT || 3001;
const { Server } = require("socket.io");


const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const connectedUsers = new Map();

/*
    SocketIO works on events.

    Some certain events built in to SocketIO
    Like listening for the event upon connection -> io.on("connection", )
*/

// Whenever user connects to server this is called
// Whenever one hits the url or open this site
io.on("connection", (socket) => {

    // Assigns unique ID to each client connection.
    // console.log(`User Connected ${socket.id}`);
    
    socket.on("set_username", (data) => {
        connectedUsers[socket.id] = data.username;
        console.log(`${data.username} connected with socket ID: ${socket.id}`);

        // socket.emit("users_list", )
    })

    socket.on("join_room", (data) => {
        socket.join(data.id)
        console.log(`user with id ${socket.id} joined the room ${data.id}`)
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
        console.log(data)
    });

    socket.on("disconnect", () => {
        const username = connectedUsers[socket.id];
        delete connectedUsers[socket.id];
        console.log(`${username} disconnected`);
    })
});


server.listen(port, () => console.log(`Server has started listening on port ${port}`));
// app.listen(port, () => console.log(`Server has started listening on port ${port}`));
