/*window.onload=function(){
  ajax({
      url:"http://localhost:3000/index/imagelist",
      type:"get",
      dataType:"json"
  })
  .then(function(res){
    var html="";
   for(var i of res){
    html+=`<li><img src="${i.img}"></li>`
   }
   ul.innerHTML=html
  })
}*/
var ul=document.getElementById("ul");
var moved1=0,time=2000,trem=null,WIDTH=1000;
var nav=document.getElementById("nav");
  var navLi=nav.children;
  var div=document.getElementById("banner");
  //把四个原点追加到nav里
  for(var i =0;i<ul.children.length;i++){
        var navli=document.createElement("li");
        nav.appendChild(navli)
    }
  navLi[moved1].setAttribute("class", "hoverStyle");
  //图片自动轮播
  function banner(){
    trem=setInterval(function(){
    moved1++;
    if(moved1!=ul.children.length){
       ul.style.left=-moved1 * WIDTH + "px";
       
    }else if(moved1==ul.children.length){
       moved1=0;
       ul.style.left=0;
     
    }

    for(var t=0;t<navLi.length;t++){
      navLi[t].index=t;
      if(navLi[t].index==moved1){
       navLi[t].setAttribute("class", "hoverStyle");
      }else{
        navLi[t].setAttribute("class", "");
      }
    }
    },time);

  leftBtn.onclick=function(){
      ul.style.left=-moved1 * WIDTH + "px";
      if(moved1<0){
        moved1=ul.children.length-1;
        ul.style.left=-moved1 * WIDTH + "px";
      }
      moved1--;
    }
    rightBtn.onclick=function(){
      ul.style.left=-moved1 * WIDTH + "px";
      if(moved1==ul.children.length){
        moved1=0;
        ul.style.left=-moved1 * WIDTH + "px";
      }
      moved1++;
    }
  }
  banner();


  for(var t=0;t<navLi.length;t++){
      navLi[t].num=t;
      //点击黑点时，自切换对应的下标
      navLi[t].onclick=function(){
        var li=this;
        for(var b=0;b<navLi.length;b++){
            if(navLi[b]!==li){
              navLi[b].setAttribute("class", "");
            }else{
              navLi[b].setAttribute("class", "hoverStyle");
            }
        }
        moved1=li.num;
        clearInterval(trem);
        ul.style.left=-moved1 * WIDTH + "px";
        banner();
     }
  }
  div.onmouseover=function(){
    clearInterval(trem)
  }
  div.onmouseout=function(){
    banner();
  }
