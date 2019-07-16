var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket){
    console.log("connection: " + socket.id);

    socket.on("disconnect", function(){
        console.log("ngat ket noi : " + socket.id);
    });
    socket.on("Client-send-data", function(data){
        console.log(data);
        // io.sockets.emit("send-data-serve", data);//all()
        // socket.broadcast.emit("send-data-serve", data);
        socket.emit("send-data-serve", data);
    })
})

app.get("/", function(req, res) {
    res.render("trangchu");
})