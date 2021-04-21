// const mongoose = require("mongoose");
const server = require("http").createServer();
// const Msg = require("./models/messages")
const io = require("socket.io")(server, {
    cors: {
        origin: "https://react-chat-app-saif.herokuapp.com",
        methods: ["GET", "POST"],
        credentials: true,
        transports: [            // all transports (optional if you want flashsocket)
            'websocket'
            , 'flashsocket'
            , 'htmlfile'
            , 'xhr-polling'
            , 'jsonp-polling'
        ]
    },
});


const PORT = process.env.PORT || 80;

// mongoose.connect('mongodb://localhost:27017/chatApp', {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }).then(done => {
//     console.log('connected to mongo');
// });

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
// const EXISTING_CHAT_MESSAGE_EVENT = "existingChatMessage";

io.on("connection", (socket) => {

    // Msg.find().then((result) => {
    //     socket.emit(EXISTING_CHAT_MESSAGE_EVENT, result);
    // })

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        // const message = new Msg({ body: data.body, roomId : data.roomId , senderId : data.senderId })
        // message.save().then(() => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        // })
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});