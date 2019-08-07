var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
var userInfos = [];
// var listUser = {};
io.on("connection", function(socket){
    console.log("connection: " + socket.id);
    // socketInfo[socket.id].socket =  socket;
    // socketInfo[socket.id].data =  {}; //store socket related data here
    // console.log(socketInfo);

    socket.on("client-send-Username", function(data){
        if(userInfos.indexOf(data)>=0){
            socket.emit("server-send-regist-fail", "Tài khoản đã tồn tại");
        }else{
            userInfos.push(data);
            socket.Username = data;
            // listUser.Usernames = userInfos;
            // listUser.currentUser = data;
            socket.emit("server-send-regist-success", data);
            io.sockets.emit("server-send-list-user", userInfos);
        }
    });
    socket.on("client-send-logout", function(){
        userInfos.splice(userInfos.indexOf(socket.Username), 1)
        socket.broadcast.emit("server-send-list-user", userInfos);
    })
    socket.on("client-send-message", function(data){
        console.log(socket)
        // io.sockets.emit("server-send-message", {un: socket.Username, nd: data});
        // io.to(socket.Username).emit('server-send-message', {un: socket.Username, nd: data});
        socket.emit('server-send-message', {un: socket.Username, nd: data});
    })
    socket.on("client-typing", function(){
        var s = socket.Username + " " + " typing";
        socket.broadcast.emit("server-send-typing", s);
    })
    socket.on("client-stop-typing", function(){
        var s = socket.Username + "stop typing";
        socket.broadcast.emit("server-stop-typing", socket.Username);
    })
    
});

app.get("/", function(req, res) {
    res.render("trangchu");
})