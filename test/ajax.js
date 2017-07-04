var xhr=null;
if(XMLHttpRequest){
 xhr = new XMLHttpRequest();
}else{
 xhr = new ActiveXObject('Microsoft.XMLHTTP')
}
 xhr.onreadystatechange=function(){
  if(xhr.readyState==4&&xhr.statue==200){
   console.log(xhr.responseText)
  }
 }
 xhr.open("get",url,true);
 xhr.send(null);

 xhr.open("post",url,true);
 xhr.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf-8")
 xhr.send(data);
//**************************************************
//封装
function ajax(obj){
 //url,method,data,async,success
 //对未输入的选项做默认设置
 obj=obj||{};
 obj.method=obj.method.toUpperCase()||"POST";
 obj.url=obj.url||'';
 obj.data=obj.data||null;
 obj.async=obj.async||true;
 obj.success=obj.success||function(){};
 //xhr设置
 var xhr=null;
 if(XMLHttpRequest){
  xhr=new XMLHttpRequset();
 }else{
  xhr=new ActiveXObject("Microsoft.XMLHTTP");
 }
 //发送消息处理
 var params=[];
 for(var key in obj.data){
  params.push(key+"="+obj.data[key])
 };
 var postData=params.join("&");
 //判断请求类型
 if(obj.method==='POST'){
  xhr.open(obj.method,obj.url,obj.async);
  xhr.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf-8");
  xhr.send(postDate);
 }else if(obj.method==='GET'){
  xhr.open(obj.method,obj.url+"?"+postData,obj.async);
  xhr.send(null);
 }
 //成功后获取数据
 xhr.onreadystatechange=function(){
  if(xhr.readystate===4&&xhr.status===200){
   obj.success(xhr.responseText)
  }
 }
}
//调用
ajax({
 method:'',
 url:'',
 data:'',
 async:'',
 success:function(data){
  console.log(data) 
 }
})

//属性 
//onreadystatechange 状态改变触发器
//readyState 请求状态
//responseText 响应文本
//responseXML 响应XML文件
//responseBody 返回主题
//responsestream 返回数据流
//status 服务器状态码
//statusText 服务器返回的状态码对应文本

//方法
//abort() 停止请求
//getAllResponseHeaders() 获取所有响应头
//getResponseHeader("header") 获取指定头
//open() 建立连接
//send() 发送请求
//setRequestHeader("header","value") 设置头部文件,必须在调用open()后