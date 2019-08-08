var socket = io("http://localhost:3000");

socket.on("server-send-rooms", function(data){
    console.log(data)
    $("#dsRooms").html("");

    data.map(function(r){
        $("#dsRooms").append("<h4 class='room'>" + r + "</h4>");
    })
})
socket.on("server-send-room-client", function(data){
    console.log(data)
    $("#roomHienTai").html(data)
})
socket.on("server-send-mesage", function(data){
    $("#right").append("<br>" + data + "</br>")
})

$(document).ready(function(){
    $("#createRoom").click(function(){
        socket.emit("tao-room", $("#txtText").val());
    });
    $("#btnChat").click(function(){
        socket.emit("chat-room", $("#txtMessage").val())
    })
});

