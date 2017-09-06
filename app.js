var ex=require('express')();  //加载模块
var http=require('http').Server(ex); 
var io=require('socket.io')(http);  //加载socket 模块

var user_list={};
 // ex.get('/',function(req,res){
 // 	 res.send('<h1>1231245456</h1>');
 // })  html页面显示

 http.listen(9998,function(){
 	  console.log('http://127.0.0.1:9998');  //http URL
 })
io.on('connection', function(socket){  //连接
    //console.log('a user connected');
    //console.log(socket);
    socket.on('roomuser',function(user){
         console.log(user.usname+' '+'加入了聊天室');
         io.emit("roomuser",user.usname);
         socket.name=user.usid;
          if(!user_list.hasOwnProperty(user.usid)) {
            user_list[user.usid] = user.usname;
            io.emit('num',user_list);
           }
         // window.user_name=user;
    })
    socket.on('room', function(msg){ //这里接受 text 变成 msg
       console.log(msg);
        io.emit("room",msg);
    });
  socket.on('disconnect', function(){
    //将退出的用户从在线列表中删除
    if(user_list.hasOwnProperty(socket.name)) {
      //退出用户的信息
      var obj = {id:socket.name,name:user_list[socket.name]};
    
      //删除
      delete user_list[socket.name];
      //向所有客户端广播用户退出
       io.emit('logout',obj.name);
       console.log(obj.name+' '+'退出了聊天室');
       io.emit('num',user_list);
    }
  });
});


// console.log("123456");
// http.createServer(function(req,res){ 
//       res.end('127.0.0.1:9997');  
// }).listen(9997);
