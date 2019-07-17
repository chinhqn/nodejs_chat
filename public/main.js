
var socket = io("http://localhost:3000");

socket.on("server-send-regist-fail", function(data){
    alert(data);
})
socket.on("server-send-list-user", function(data){
    var data = data;
    console.log(data);
    $("#boxContent").html("");
    data.forEach((item) => {
        $("#boxContent").append("<li>"+item+"</li>");
    });
})
socket.on("server-send-regist-success", function(data){
    $("#nameNow").html(data.currentUser);
    $("#loginForm").hide(1000);
    $("#chatForm").show(1000);
})
socket.on("server-send-message", function(data){
    $("#contentMessage").append(
        "<div>" +
        "<span class='message'>"+data.un+"</span> :" +
        "<span class='message'>"+data.nd+"</span>" +
        "</div>" 
    );
})
socket.on("server-send-typing", function(data){
    $("#noty").addClass("dots");
    $("#typing").css("display", "block");
    $("#typing").html(data);    
})
socket.on("server-stop-typing", function(data){
    $("#noty").removeClass("dots");
    $("#typing").css("display", "none");
})
$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();  
    $("#btnRegister").click(function(){
        var register = $("#txtRegister").val();
        socket.emit("client-send-Username", register);
    })
    $("#logout").click(function(){
        socket.emit("client-send-logout");
        $("#loginForm").show();
        $("#chatForm").hide();
    })
    $("#btnSendMessage").click(function(){
        var message = $("#txtMessage").val();
        socket.emit("client-send-message", message);
        $("#txtMessage").val("");

    })
    $("#txtMessage").focusin(function(){
        socket.emit("client-typing");
    })
    $("#txtMessage").focusout(function(){
        socket.emit("client-stop-typing");
    })
})