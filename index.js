const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')

app.use(cors());

const server = http.createServer(app);

// const whitelist = ['http://localhost:3000', 'https://woh-chat-app.herokuapp.com']
// const corsOptions = {
//     origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//         console.log("Origin acceptable")
//         callback(null, true)
//     } else {
//         console.log("Origin rejected")
//         callback(new Error('Not allowed by CORS'))
//     }
//     }   
// }
// app.use(cors(corsOptions))

const io = new Server(server, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://woh-chat-app.herokuapp.com",
        methods: ["GET", "POST"],
    }
})

// When user connecter to the server
io.on('connection', (socket) => {
    console.log('User Connected', socket.id);
    socket.emit('users_count', io.engine.clientsCount)

    socket.on('join_room', (data) => {
        socket.join(data)
        
        socket.emit('users_in_room_count', io.sockets.adapter.rooms.get(data).size)
        socket.to(data).emit('users_in_room_count', io.sockets.adapter.rooms.get(data).size)
        
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on('send_message', (data) => {
        console.log(data)
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on('disconnect', () => {
        console.log('User Disconected', socket.id)
    })
}) 

// Serve client react instead of backend 
// Add the follwing code to your server file on the backend 
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

server.listen(process.env.PORT || 3001, () => {
    console.log("Server is runnig")
})