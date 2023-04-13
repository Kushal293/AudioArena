require('dotenv').config();
const express = require('express');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();
const DbConnect = require('./database');
const cors = require('cors');
const ACTIONS = require('./actions');
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.use(cookieParser());
const corsOptions = {
    credentials: true,
    origin: [ 'http://localhost:3000' ],
};

app.use(cors(corsOptions));
app.use('/storage', express.static('storage'));

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({ limit: '8mb' }));
app.use(router)

app.get('/', (req, res) => {
    res.send("Hello from Express Js!");
});

//! SOCKETs

const socketUserMapping = {

}

io.on('connection', (socket) => {
    console.log('new connection ', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
        socketUserMapping[ socket.id ] = user;

        //* new map
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user
            });

            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMapping[ clientId ],
            });

        });

        socket.join(roomId);
    });

    //* Handle relay ice
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate,
        });
    });

    //* Handle relay sdp (session description)
    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });

    //* Handle mute/unmute

    socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.MUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });

    socket.on(ACTIONS.UN_MUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.UN_MUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });

    //* Leaving the room
    const leaveRoom = ({ roomId }) => {
        const { rooms } = socket;

        Array.from(rooms).forEach(roomId => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

            clients.forEach(clientId => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMapping[ socket.id ]?.id,
                });

                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMapping[ clientId ]?.id,
                });
            });

            socket.leave(roomId);
        });

        delete socketUserMapping[ socket.id ];
    }

    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);
});


server.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});