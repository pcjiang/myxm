$(function(){
    $(".btn").click(function(){
      var uname=$(".uname").val()
      var upwd=$(".upwd").val()
      var email=$(".email").val()
      var phone=$(".phone").val()
      var req1=/^[a-zA-Z][0-9]{6,10}$/
      var req2=/^[a-zA-Z][a-zA-Z0-9]{3,15}$/
      var req3=/^\w+@\w+\.(com|cn|org|cn)(\.cn)?$/
      var req4=/^s*1[3-8]\d{9}$/
      if( (req1.test(uname)&&req2.test(upwd))&&(req3.test(email)&&req4.test(phone)) ){(async function(){   
        var res=await $.ajax({
            url:"http://localhost:3000/user/register",
            type:"post",
            dataType:"json",
            data:{uname,upwd,email,phone}
        });
        if(res.ok==1){
            alert("注册成功,即将跳转到登录界面");
            location.href="login.html";
        }
    })()}else{
        alert("您的注册格式不正确！")
    }
        
   })
})