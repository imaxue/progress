// services
var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

var clientCount = 0;

app.listen(PORT);

io.on('connection',function(socket){
    clientCount++;
    socket.nickname = 'user' + clientCount;
    io.emit('enter',socket.nickname + 'come in');

    socket.on('message',function(str){
        io.emit('message',socket.nickname + 'say:' + str);
        console.log('message',socket.nickname + 'say:' + str);
    })

    socket.on('disconnect',function(){
        io.emit('leave',socket.nickname + 'was leaved')
    })
});
console.log('socket server at port: ' + PORT);


// client
var socket = io('ws://localhost:3000/');

function showMessage(data,type){
    var div = document.createElement('div');
    div.innerHTML = data;
    if(type == 'enter'){
        div.style.color = "green";
    }else if(type == 'leave'){
        div.style.color = 'red'
    }
    document.body.appendChild(div);
}

document.getElementById('submit').onclick = function(){
    var text = document.getElementById('message').value;
    if(text){
        socket.emit('message',text);
            }
        }

socket.on('enter',function(data){
    showMessage(data,'enter')
});

socket.on('message',function(data){
    showMessage(data,'message')
});

socket.on('leave',function(data){
    showMessage(data,'leave')
})