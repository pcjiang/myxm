window.onload=function(){
    ajax({
        url:"http://localhost:3000/index/",
        type:"get",
        dataType:"json"
    })
    .then(function(res){
        var html="";
        for(var i=0;i<res.length;i++){
            var {title,img_url,uname,price}=res[i];
            html+=`<div class="col-2 my_div">
            <div><img src="${img_url}" class="my_img"></div>
            <div class="text-center">
                <p>${title}</p>
                <h4>${name}</h4>
                <h5>$ ${price.toFixed(2)} 美元</h5>
                <div class="my_border pb-3"></div>
                <div class="d-flex justify-content-around pt-4 pb-4">
                    <div><button>收藏</button></div>
                    <div><button>对比</button></div>
                    <div><button>浏览</button></div>
                </div>
            </div>
        </div>`
        }
        var banner2=document.querySelector(".banner2")
        var banner=document.getElementById("banner")
        banner.innerHTML=html;
        banner2.innerHTML=html
    })
}
//块级动态轮播
var chao=document.querySelector(".chao")
var moved=0,width=250
var div=document.querySelector(".banner")
function banner(){
var timer=setInterval(function(){
    moved++;  
    if(moved!=3){
      chao.style.left=-moved*width+"px"
    }else if(moved==3){
         moved=0
        chao.style.left=moved*width+"px"
    }   
},2000)
}
//点击切换轮播
var leftBtn=document.getElementById("leftBtn")
var rightBtn=document.getElementById("rightBtn")
var num=0;
leftBtn.onclick=function(){
    num++;
    chao.style.left=-num*width+"px";
    if(num==2){
        leftBtn.disabled=true;
        rightBtn.disabled=false;
        num=0;
    }
}
rightBtn.onclick=function(){
    num++;
    chao.style.left=-num*width+"px";
    if(num==2){
        rightBtn.disabled=true;
        leftBtn.disabled=false;
        num=0;
    } 
}
banner();
//限时特卖时间
function task(){
    var end=new Date("2018/12/29 00:00:00");
    var now=new Date();
    var s=parseInt((end-now)/1000);
    if(s>0){
    var d=parseInt(s/3600/24);
    if(d<10) d="0"+d;
    //s/3600/24,再下取整
    var h=parseInt(s%(3600*24)/3600);
    if(h<10) h="0"+h;
    //s/(3600*24)的余数,再/3600,再下去整
    var m=parseInt(s%3600/60);
    if(m<10) m="0"+m;
    //s/3600的余数,再/60，再下取整
    s%=60;//s/60的余数
    if(s<10) s="0"+s;
    //距离下一个假期还有: ?天?小时?分?秒
    var day=document.getElementById("day");
    var time=document.getElementById("time")
    var minute=document.getElementById("minute")
    var second=document.getElementById("second")
    day.innerHTML=d;
    time.innerHTML=h;
    minute.innerHTML=m;
    second.innerHTML=s;
    }else{
      clearInterval(timer);
      var span=document.getElementById("span");
      span.innerHTML="限时特价";
    }
  }
  task();
  var timer=setInterval(task,1000);
