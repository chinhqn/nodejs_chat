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
        console.log(socket.adapter.rooms);
        var mang = [];

        for(r in socket.adapter.rooms){
            mang.push(r);
        }
    })
})
app.get("/", function(req, res) {
    res.render("chatroom");
})