const express=require("express");
const router=express.Router();
const pool=require=require("../pool");
  router.post("/signin",(req,res)=>{
    var {uname,upwd}=req.body;
    var sql="select * from xz_user where uname=? and upwd=?";
    pool.query(sql,[uname,upwd],(err,result)=>{
      if(err) console.log(err);
      if(result.length>0){
        req.session.uid=result[0].uid;
        res.write(JSON.stringify({ok:1}));
      }else{
        res.write(JSON.stringify({ok:0,msg:"用户名或密码错误!"}));
      }
      res.end();
    })
  })
  router.get("/islogin",(req,res)=>{  
    var uid=req.session.uid
    if(uid==null){
      res.write(JSON.stringify({ok:0}));
      res.end();
    }else{
      var sql="select * from xz_user where uid=?";
      pool.query(sql,[uid],(err,result)=>{
        res.write(JSON.stringify({ok:1,uname:result[0].uname}));
        res.end();
      })
    }
  })
  router.get("/signout",(req,res)=>{
    delete req.session.uid;
    res.send();
  })
  router.post("/register",(req,res)=>{
    var {uname,upwd,email,phone}=req.body;
    var sql="insert into xz_user values('',?,?,?,?,null,null,null)";
    pool.query(sql,[uname,upwd,email,phone],(err,result)=>{
        if(err) console.log(err) ;
        console.log(result.affectedRows)
        if(result.affectedRows>0){
        res.write(JSON.stringify({ok:1}));
        res.end();
        }
      })      
  })
module.exports=router;