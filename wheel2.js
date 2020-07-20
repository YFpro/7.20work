function wheel(wins,opts,runOpts){
this.init(wins,opts,runOpts);
this.getWin();
this.creatBox();
this.creatList();
this.creatBtn();
this.autoRun();
this.clickRun();
}
wheel.prototype={
     init(wins,opts,runOpts){
         var wins=document.querySelector(wins);
        if(!(wins&&wins.nodeType==1)){
            console.error("无窗口元素");
            return;
        }
        this.runOpts=runOpts;
        this.opts=opts;
        this.wins=wins;
         opts.imgs.push(opts.imgs[0]);
         opts.links.push(opts.links[0]);
         opts.imgColor.push(opts.imgColor[0]);
         this.imgLength=opts.imgs.length;
              if(this.imgLength==0){
              console.error("没有传入相应的轮播内容");
              return;
              }
         this.imgSize=opts.imgSize;
             if(!(this.imgSize instanceof Array)){
             console.log("请传入合法尺寸");
             }
            if(this.imgSize.length==0){
                this.imgSize[0]=document.documentElement.clientWidth;
                this.imgSize[1]=400;
            }
            if(this.imgSize.some(function(val){
                return val==0;
            })){
                for(var i=0;i<2;i++){
                    if(this.imgSize[i]==0){
                        this.imgSize[i]==500;
                    }
                }
            }
            this.btnColor=opts.btnColor||"green";
            this.btnActive=opts.btnColor||"red";
            this.btnPos=opts.btnPos||["center" ,"20"]
            this.runOpts=runOpts ||{}
            this.time=0;
    if(runOpts.time){
        this.time=runOpts.time*1000;
    }else {
        this.time=5000;
    }
    this.eachTime=0;
    if(runOpts.time){
        this.eachTime=runOpts.eachTime*1000;
        }else {
            this.eachTime=500;
        }
        this.runStyle=null;
    if(runOpts.runStyle=="linner"||!(runOpts.runStyle)){
        this.runStyle=Tween.Linear;
    }else if(runOpts.runStyle=="in"){
        this.runStyle=Tween.Quad.easeIn;
    }else if(runOpts.runStyle=="out"){
        this.runStyle=Tween.Quad.easeOut;
    }
     },
     getWin(){
        this.wins.style.cssText="width:100%;height:"+this.imgSize[1]+"px;overflow:hidden;position:relative;"
     },
     creatBox(){
        this.box=document.createElement( "div");
        this.box.style.cssText="width:"+this.imgLength*100+"%;height:100%;border:1px solid red;"
        this.wins.appendChild(this.box);
     },
     creatList(){
        for(var i=0;i<this.imgLength;i++){
            var divList=document.createElement("div");
            divList.style.cssText=`float:left;width:${100/this.imgLength}%;
            height:100%;border:1px solid blue; background:${ this.opts.imgColor
            [i]}`;
            var link=document.createElement("a");
            link.href=opts.links[i];
            // console.log(imgSize);
            link.style.cssText="width: "+this.imgSize[0]+"px;height: "+this.imgSize[1]
            +"px;display: block;margin:auto;background:url("+this.opts.imgst2
            +")no-repeat 0 0"
            divList.appendChild(link);
            this.box.appendChild(divList);
            }
     },
     creatBtn(){
        var btnBox=document.createElement( "div");
        btnBox.style.cssText="width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:"+this.btnPos[1]+"px";
        this.btns=[];
        for(var i=0;i<this.imgLength-1;i++){
        var bgcolor=i==0?this.btnActive:this.btnColor;
        var btn=document.createElement( "div");
        btn.style.cssText="width:20px;height : 20px;background:"+bgcolor+";border-radius:50%;margin:0 10px;cursor:pointer;float:left";
        btnBox.appendChild(btn);
        this.btns.push(btn);
        }
        this.wins.appendChild(btnBox);
     },
     autoRun(){
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
              },this.eachTime,this.runStyle,function(){
                  box.style.marginLeft=0;
              })
               num=0;    
          } else{
              animate(box,{
                  "margin-left":-num*winW
           },this.eachTime,this.runStyle)
        }
        
            for(var i=0;i<btns.length;i++){
            btns[i].style.background=btnColor;
               }
           btns[num].style.background=btnColor;
           
        },
       
        },
     clickRun(){
            var t =setInterval(move,time);
            for (let i = 0; i< this.btns.length; i++){
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
     }


