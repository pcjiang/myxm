$(function(){
    if(location.search.indexOf("lid=")!=-1){
      var lid=location.search.split("=")[1];
      (async function(){
         var res=await $.ajax({
         url:"http://localhost:3000/detail",
         type:"get",
         data:{lid},//"lid="+lid
         dataType:"json"
        })//var res=open(res)
        console.log(res) 
        var {product,pics,specs}=res
        var {title,lname,price}=product;
        console.log(title)
        $(".title").html(title)      
        $(".lname").html(lname)
        $(".price").html("$"+price.toFixed(2))
        var html=""
        for(var pic of pics){
            var {sm,md,lg}=pic;
            html+=`<li><img src="${sm}" data-md="${md}" data-lg="${lg}"></li>` 
        }
        $("#ul").html(html);
        $("#md").children().attr("src",pics[0].md)
        $("#lg").css("backgroundImage",`url(${pics[0].lg})`)
        //鼠标进入每个小图片，切换中图片和大图片
        $("#ul").mouseover(function(e){
            if(e.target.nodeName==="IMG"){
                var img=e.target;
                var md=img.dataset.md;
                var lg=img.dataset.lg;
                $("#md").children().attr("src",md)
                $("#lg").css("backgroundImage",`url(${lg})`)
            }
          })
          //小图片左右移动
          var $left=$("#leftBtn")//找到左边按钮-后退按钮
          var $right=$("#rightBtn")//找到右边按钮-前进按钮
          //当图片小于或者等于2张是 禁用上下按钮
          if(pics.length<=2){
            $left.addClass("disabled")
            $right.addClass("disabled")
          }
          //点击上边按钮  向上移动
          var moved=0;
          $left.on("click",function(){
              var $left=$(this)
              if(!$left.is(".disabled")){
                  moved--;
                  $("#ul").css("top",153*moved)
                  //当获取图片的数量和-moved相加为2的时候上面按钮禁用 ，下面按钮
                  if(pics.length+moved==2){
                  $left.addClass("disabled")
                  $right.removeClass("disabled")
                  }
              }
          })
          //点击按钮向下移动
          $right.on("click",function(){
              var $right=$(this);
              if(!$right.is(".disabled")){
                  //console.log(moved)
                  moved++;
                  $("#ul").css("top",153*moved)
                  //当moved的为零的时候 禁用下边按钮 让上边按钮解除禁用
                  if(moved==0){
                    $right.addClass("disabled")
                    $left.removeClass("disabled")
                  } 
              }
          })
          var $mImg=$("#md"),//中图片
              $lgDiv=$("#lg"),//大图片
              $mask=$("#mask"),//半透明遮罩
              $smask=$("#super-mask");//透明玻璃板
          var MSIZE=250,//mask的大小
              MAX=500-MSIZE;//top和left的最大值
          $smask.hover(function(){
              console.log(1)
              $mask.toggleClass("d-none");
              $lgDiv.toggleClass("d-none");
          }).mousemove(function(e){
              var left=e.offsetX-MSIZE/2;
              var top=e.offsetY-MSIZE/2;
              if(left<0) left=0;
              else if(left>MAX) left=MAX;
              if(top<0) top=0
              else if(top>MAX) top=MAX;
              $mask.css({left,top});
              $lgDiv.css("background-position",`-${16/7*left}px -${16/7*top}px`)
          })    
      })()
    }
})