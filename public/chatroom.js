var socket = io("http://localhost:3000");
$(document).ready(function(){
    $("#createRoom").click(function(){
        socket.emit("tao-room", $("#txtText").val());
    });
});
