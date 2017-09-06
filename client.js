var d=document;
window.user_num=0;
function aaa(){
	var text=d.getElementById('a').value;  
    var socket = io('http://10.50.102.135:9998');  //连接
    socket.emit("room",user_name+' : '+text);  //把text 发过去
    socket.emit("num");
    d.getElementById('a').value="";
}
window.onload=function(){
	d.getElementById('1').style.display="block";
	d.getElementById('2').style.display="none";
	   // alert(document.getElementById('1').style.display);
    var socket = io('http://10.50.102.135:9998');  //连接

        socket.on("roomuser",function(user){
        	d.getElementById('login_message_div').innerHTML="<a style='color:red'>"+user+"</a>"+" "+"<a style='color:black'>已登录</a>";
        	// document.getElementById('user_num').innerHTML=user_num;
        	 // document.getElementById('username').innerHTML=user+"　";
      	});
		socket.on("room", function(msg){    //接收msg
            var div=d.createElement('div');
            div.style.cssText="font-family:微软雅黑;margin-left:15px;margin-right:15px;min-height:30px;line-height:40px;word-wrap:break-word;word-break: break-all;"
            div.innerHTML=msg;
            d.getElementById('message').appendChild(div);
            d.getElementById('message').scrollTop=d.getElementById('message').scrollHeight;

        })
        socket.on("logout",function(user){
        	d.getElementById('login_message_div').innerHTML="<a style='color:red'>"+user+"</a>"+" "+"<a style='color:black'>已退出</a>";
        	// d.getElementById('user_num').innerHTML=num;
        })

        socket.on('num',function(num_list){
           var suq=getPropertyCount(num_list);
           d.getElementById('user_num').innerHTML='当前在线'+' '+"<a style='color:red'>"+suq+"</a>"+' '+'人';
           if(d.getElementById('user_list_body').children.length!==0){
           	  var length_list=d.getElementById('user_list_body').children.length;
           	  for(var zx=0;zx<length_list;zx++){
                 d.getElementById('opsaxfjsa').parentNode.removeChild(d.getElementById('opsaxfjsa'));
              }
           }
	       var n;
	       for(n in num_list){
	           var user_div=d.createElement('div');
               user_div.style.cssText="width:100%;line-height:30px;height:30px;text-align:center;font-family:微软雅黑;background-color:#eeefff;border-bottom:1px silver solid";
               user_div.id="opsaxfjsa";
               user_div.innerHTML=num_list[n];
               d.getElementById('user_list_body').appendChild(user_div);
	        }
        })

      	// });
         d.onkeyup=function (e){
	     	e=e||window.event;
	     	// 32
	     	if(e.keyCode==13){
	     		if(d.getElementById('1').style.display=="none"){
	     			if(d.getElementById('a').value==""){
	     				alert('输入内容');
	     				return;
	     			}
	     		     d.getElementById('b').click();
	     		     return;
	     		}
	     		if(d.getElementById('2').style.display=="none"){
	     			if(d.getElementById('e').value==""){
	     				alert('输入名字');
	     				return;
	     			}
	     		     d.getElementById('d').click();
	     		     return;
	     		}
	     	}
	     }
}
function bbb(){
	d.getElementById('1').style.display="none";
	d.getElementById('2').style.display="block";
	    // d.getElementById('a').click();
	var username=d.getElementById('e').value;
	var username2=ten_text(username);
    this.init(username2);
}
  function init(username){
         document.getElementById('username').innerHTML=username+"　";
	  	// var socket = io('http://10.3.13.73:9998');  //连接
    var socket = io('http://10.50.102.135:9998');  //连接
        this.uid=genUid();
        this.uname=username;
  	    socket.emit('roomuser',{usid:this.uid, usname:this.uname}); //把username发过去
        socket.emit("num2");
  	    window.user_name=username;
  }
function out(){
	 location.reload();

}
function genUid(){
	return new Date().getTime()+""+Math.floor(Math.random()*899+100);
}
function getPropertyCount(o){  
   var n, count = 0;  
   for(n in o){  
      if(o.hasOwnProperty(n)){  
         count++;  
      }  
   }  
   return count;  
} 
function ten_text(username){
	var d="";
	if(username.length>10){
        for(var i=0;i<10;i++){
               d=d+username[i];
        }
        var dd=d+'...';
         return dd;
	}
	else{
		 return username;
	}
}
function clean_window(){
    var children_length=d.getElementById('message').children.length;
    // alert(children_length);
    for(var k=0;k<children_length;k++){
      // alert(k);
         d.getElementById('message').removeChild(d.getElementById('message').children[0]);
    }
}