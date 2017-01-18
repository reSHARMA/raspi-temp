var ioClient = require ('socket.io-client');
var express = require ('express');
var app = express();
var server = require ('http').createServer(app);
var io = require('socket.io')(server);
app.get('/',function(req,res){
res.send("PI conf page running ...")
});

var socketClient = ioClient.connect('https://relock.herokuapp.com/');
socketClient.on('connect',function(){
  socketClient.emit('remote','connected successfully');
   socketClient.on('status',function(data){
  console.log(data);
 });
});
 socketClient.on('stat',function(data){
  console.log(data);
 });
var port = process.env.PORT || 3001;
server.listen(port);
