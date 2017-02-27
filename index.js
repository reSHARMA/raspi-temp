var ioClient = require ('socket.io-client');
var express = require ('express');
var app = express();
var server = require ('http').createServer(app);
var io = require('socket.io')(server);
var stat;
/* var gipo = require ('rpi-gipo')    
   var lockPin = 7;
   var statusPin = 6;
   gipo.setup(lockPin,gipo.DIR_OUT,function(){
        gpio.write(lockPin,true);
   });
     gipo.setup(lockPin,gipo.DIR_OUT,function(){
        gpio.write(lockPin,false);
   });
     gipo.setup(statusPin,gipo.DIR_IN,function(err,value){
       console.log(value);
       socketClient.emit('result',value);
       status=value;
   });
 */
app.get('/',function(req,res){
res.send("PI conf page running ...")
});
function status(){
     /*gipo.setup(statusPin,gipo.DIR_IN,function(err,value){
       console.log(value);
       socketClient.emit('result',value);
       stat=value;
       return stat;
     */
       return "unlock";
}
var socketClient = ioClient.connect('https://relock.herokuapp.com/', {reconnect: true});
socketClient.on('connect',function(){
   
   var interval = setInterval(function() {
 console.log("pi connected");
 socketClient.emit('remote','connected successfully');
 socketClient.emit('stat',status());
}, 10000);
  
});
   socketClient.on('pi',function(data){
   if(data=="lock"){
     console.log(data);
      io.emit('action',data);
    /* gipo.setup(lockPin,gipo.DIR_OUT,function(){
        gpio.write(lockPin,true);
       });
    */
   /* if(status()==data) socketClient.emit('status',data+'ed'); 
      else {
         socketClient.emit('status','...'); 
         socketClient.emit('error','try again');
           }
           */
      socketClient.emit('status',data+'ed'); 
  } else  if(data=="unlock"){
                console.log(data);
     io.emit('action',data);
             /* gipo.setup(lockPin,gipo.DIR_OUT,function(){
                gpio.write(lockPin,false);
                });
             */
         /*   if(status()==data) socketClient.emit('status',data+'ed'); 
            else {
            socketClient.emit('status','...'); 
            socketClient.emit('error','try again');
            }
            */

});
    
    socketClient.on('ring', function(data) {
            console.log(data);
            socketClient.emit('ring', data);
        });
var port = process.env.PORT || 3001;
server.listen(port);
