var express = require('express'); 
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//Including style files
app.use(express.static('style/'));

//We define a route handler / that gets called 
//when we hit our website home.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//We can do the same when we want to access another
//
app.get('/settings.html', function(req, res){
  res.sendFile(__dirname + '/settings.html');
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
    
    socket.on('server message', function(msg){
      io.emit('server message', msg);
      console.log('server message: ' + msg);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});