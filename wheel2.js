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
        this.runOpts=runOpts;
        this.opts=opts;
        this.wins=wins;
        var wins=document.querySelector(wins);
        if(!(wins&&wins.nodeType==1)){
            console.error("无窗口元素");
            return;
        }
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
     _setVal(){
        this._winW=parseInt(getComputedStyle(this.wins,null).width);
        this._num = 0;
        this.t=0;
     },
     _move(){
         var that=this;
         return function(){
        this._num++;
        if ( that._num>that.btns.length-1){
            animate(that.box,{
               "margin-left":-that._num*that._winW
           },that.eachTime,that.runStyle,function(){
               that.box.style.marginLeft=0;
           })
           that._num=0;    
       } else{
           animate(that.box,{
               "margin-left":-that._num*that._winW
        },that.eachTime,that.runStyle)
     }
     //按钮轮播
         for(var i=0;i<that.btns.length;i++){
            that.btns[i].style.background=that.btnColor;
            }
            that.btns[num].style.background=that.btnActive;
        } 
     
    },
     autoRun(){
        this._setVal();
        this.t=setInterval(this._move.call(this),this.time);
     },   
     clickRun(){ 
    var that=this;  
    for (let i = 0; i< this.btns.length; i++){
    this.btns[i].onclick = function (){
     this._num = i;
     animate(that.box,{
    "margin-left":-num*winW
     },that.eachTime,that.runStyle)
   for (var j = 0; j< this.btns.length; j++){
    this.btns[j].style.background = this.btnColor;
      }
      this. btns[num].style.background =this.btnActive;
}
}

    this.wins.onmouseover=function(){
      clearInterval(that.t);
     }
    this.wins.onmouseout=function(){
    this.t= setInterval(move,3000);
    }

    },

}
