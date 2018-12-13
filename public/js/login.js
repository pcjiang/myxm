$(function(){
    $("button.btn").click(function(){
      var uname=$("input.uname").val();
      var upwd=$("input.upwd").val();
      $.ajax({
        url:"http://localhost:3000/user/signin",
        type:"post",
        data:{uname,upwd},
        dataType:"json",
        success:function(data){
          if(data.ok==0) alert(data.msg);
          else{
            alert("登录成功,自动返回上一页!");
            console.log(location.search.indexOf("back="))
            if(location.search.indexOf("back=")!=-1){
              var back=location.search.slice(6);
              location.href=back;
            }else{
              location.href="http://localhost:3000/index.html"
            }
          }
        }
      })
    })
  })