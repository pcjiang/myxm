$(function(){
  if(location.search.indexOf("kwords=")!=-1){
     var kwords=decodeURI(location.search.split("=")[1])
     var pno=0;
     console.log(1)
     function loadPage(no=0){
       pno=no;
       $.ajax({
           url:"http://localhost:3000/stroe",
           type:"get",
           data:{kwords,pno},
           dataType:"json",
           success:function(output){
             console.log(output)
             var {products,pageCount}=output
             var html=""
             for(var p of products){
                 var {lid,title,price,md}=p;
                 html+=`<div class="col-xl-4 pb-4">
                 <div class="my_pro_bd my_pro_hv product">
                     <img src="${md}" alt="" class="img-fluid ">
                     <div>
                         <ul class="list-unstyled text-center">
                             <li class="small">分类</li>
                             <li><a href="#" class="small text-dark font-weight-bold ">产品名</a></li>
                             <li><b class="text-danger">$${price.toFixed(2)}</b><s class="text-muted ">$${price.toFixed(2)}</s></li>
                             <li class="text-danger ">*****</li>
                             <li>
                                 <a href="#" class="small text-dark">喜欢</a>
                                 <a href="#" class="small text-dark">对比</a>
                                 <a href="detail.html?lid=${lid}" class="small text-dark">浏览</a>
                             </li>
                         </ul>
                     </div>
                 </div>
             </div>`
             }
             $stroe.html(html)
             async function loadCart(){
              var res=await $.ajax({
                url:"http://localhost:3000/user/islogin",
                type:"get",
                dataType:"json"
              });
              if(res.ok==0)
                alert("暂未登录，无法使用购物车");
            }
            loadCart()
             var html=""
             for(var i=1;i<=pageCount;i++){
                 html+=`<li class="page-item ${i==pno+1?'active':''}"><a href="#" class="page-link text-dark">${i}</a></li>`
             }
               //删除中间li:
            $ul.children(":not(:first-child):not(:last-child)").remove()
            //将html追加到上一页后
            $ul.children().first().after(html)
            if(pno==0){//如果当前页是第一页就禁用上一页
              $ul.children().first().addClass("disabled")
            }else{//否则就启用上一页
              $ul.children().first().removeClass("disabled")
            }
            if(pno==pageCount-1){
              $ul.children().last().addClass("disabled")
            }else{
              $ul.children().last().removeClass("disabled")
            }
          }
       })    
     } 
     loadPage()
     
     var $ul=$(".pagination")
     var $stroe=$(".stroe")
     $ul.on("click","a",function(e){
        e.preventDefault();
        var $a=$(this);
        //除了禁用和当前正在激活按钮之外才能点击
        if(!$a.parent().is(".disabled,.active")){
          if($a.parent().is(":first-child"))//上一页
            var no=pno-1;//新页号=当前页号-1
          else if($a.parent().is(":last-child"))
            var no=pno+1;//新页号=当前页号+1
          else//1、2、3按钮
            var no=$a.html()-1;//新页号=按钮内容-1
          loadPage(no);//重新加载新页号的页面内容
        }
      });
  }    
})
