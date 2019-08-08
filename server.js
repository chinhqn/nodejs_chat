var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on('connection', function(socket){
    console.log("connection: " + socket.id);
    socket.on("tao-room", function(data){
        socket.join(data);
        socket.Phong = data;
        var mang = [];
        for(r in socket.adapter.rooms){
            mang.push(r)
        }
        io.sockets.emit("server-send-rooms", mang)
        socket.emit("server-send-room-client", data)
    })
    socket.on("chat-room", function(data){
        io.sockets.in(socket.Phong).emit("server-send-mesage", data)
    })
})
app.get("/", function(req, res) {
    res.render("chatroom");
})