/*
无缝轮播图
wins 要放入轮播图的窗口
opts  json   选项
      img  数组   图片数组
      links  数组  图片链接地址
      imgColor 图片颜色  全屏显示的颜色拼接
      imgSize   数组  宽  高
      btnColor Stirng  按钮颜色
      btnActive  String  获得焦点的按钮颜色

*/
function wheel(wins,opts,runOpts ){
    var wins=document.querySelector(wins);
    if(!(wins&&wins.nodeType==1)){
        console.error("无窗口元素");
        return;
    }
     opts.imgs.push(opts.imgs[0]);
     opts.links.push(opts.links[0]);
     opts.imgColor.push(opts.imgColor[0]);
    var imgLength=opts.imgs.length;
          if( imgLength==0){
          console.error("没有传入相应的轮播内容");
          return;
          }
    var imgSize=opts.imgSize;
         if(!(imgSize instanceof Array)){
         console.log("请传入合法尺寸");
         }
        if(imgSize.length==0){
         imgSize[0]=document.documentElement.clientWidth;
         imgSize[1]=400;
        }
        if(imgSize.some(function(val){
            return val==0;
        })){
            for(var i=0;i<2;i++){
                if(imgSize[i]==0){
                    imgSize[i]==500;
                }
            }
        }
var btnColor=opts.btnColor||"green";
var btnActive=opts.btnColor||"red";
var btnPos=opts.btnPos||["center" ,"20"]
var runOpts=runOpts||{};
var time=0;
if(runOpts.time){
time=runOpts.time*1000;
}else {
time=5000;
}
var eachTime=0;
if(runOpts.time){
    eachTime=runOpts.eachTime*1000;
    }else {
    eachTime=500;
    }
var runStyle=null;
if(runOpts.runStyle=="linner"||!(runOpts.runStyle)){
    runStyle=Tween.Linear;
}else if(runOpts.runStyle=="in"){
         runStyle=Tween.Quad.easeIn;
}else if(runOpts.runStyle=="out"){
         runStyle=Tween.Quad.easeOut;
}

//创建html结构样式
wins.style.cssText="width:100%;height:"+imgSize[1]+"px;overflow:hidden;position:relative;"
var box=document.createElement( "div");
box.style.cssText="width:"+imgLength*100+"%;height:100%;border:1px solid red;"
wins.appendChild(box);

//构建轮播图
for(var i=0;i<imgLength;i++){
var divList=document.createElement("div");
divList.style.cssText=`float:left;width:${100/imgLength}%;
height:100%;border:1px solid blue; background:${opts.imgColor
[0]}`;
var link=document.createElement("a");
link.href=opts.links[i];
console.log(imgSize);
link.style.cssText="width: "+imgSize[0]+"px;height: "+imgSize[1]
+"px;display: block;margin:auto;background:url("+opts.imgst2
+")no-repeat 0 0"
divList.appendChild(link);
box.appendChild(divList);
}
//构建按钮
var btnBox=document.createElement( "div");
btnBox.style.cssText="width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:"+btnPos[1]+"px";
var btns=[];
for(var i=0;i<imgLength-1;i++){
var bgcolor=i==0?btnActive:btnColor;
console.log(bgcolor);
var btn=document.createElement( "div");
btn.style.cssText="width:20px;height : 20px;background:"+bgcolor+";border-radius:50%;margin:0 10px;cursor:pointer;float:left";
btnBox.appendChild(btn);
}
wins.appendChild(btnBox);
//开始轮播
var wins=document.getElementsByClassName("window")[0];
var box=document.getElementsByClassName("box")[0];
var btns=document.querySelectorAll(".btns li");
var winW=parseInt(getComputedStyle(wins,null).width);
var num = 0;
function move(){
   num++;
   if (num>btns.length-1){
       animate(box,{
          "margin-left":-num*winW
      },eachTime,runStyle,function(){
          box.style.marginLeft=0;
      })
       num=0;    
  } else{
      animate(box,{
          "margin-left":-num*winW
   },eachTime,runStyle)
}

    for(var i=0;i<btns.length;i++){
    btns[i].style.background=btnColor;
       }
   btns[num].style.background=btnColor;
   
}

var t =setInterval(move,time);
          
    for (let i = 0; i< btns.length; i++){
    btns[i].onclick = function (){
     num = i;
     animate(box,{
    "margin-left":-num*winW
},eachTime,runStyle)
   for (var j = 0; j< btns.length; j++){
    btns[j].style.background = btnColor;
      }
        btns[num].style.background =btnActive;
}
}

    wins.onmouseover=function(){
      clearInterval(t);
 }
    wins.onmouseout=function(){
    t= setInterval(move,3000);
    }
}