var express = require('express'); 
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('.'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    io.emit('server message', 'Welcome New User!');

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('server message', 'User Has Disconnected');
    });
    
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});