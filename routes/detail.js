const express=require("express")
const router=express.Router()
const pool=require("../pool")
router.get("/",(req,res)=>{
  var lid=req.query.lid;
  console.log(lid);//5
  var output={product:{},pics:[],specs:[]};
  //用lid查当前商品信息
  var sql1="SELECT * FROM xz_laptop where lid=?";
  var sql2="SELECT * FROM xz_laptop_pic where laptop_id=?";//用lid查当前商品图片列表
  var sql3="SELECT lid,spec FROM xz_laptop where family_id=( select family_id from xz_laptop where lid=? ) ";//用lid查当前商品同系列的规格列表
  Promise.all([
    new Promise(function(open){
      pool.query(sql1,[lid],(err,result)=>{
        if(err) console.log(err);
        output.product=result[0];
        open();
        console.log("查询product完成!");
      })
    }),
    new Promise(function(open){
      pool.query(sql2,[lid],(err,result)=>{
        if(err) console.log(err);
        output.pics=result;
        open()
        console.log("查询pics完成");
      })
    }),
    new Promise(function(open){
      pool.query(sql3,[lid],(err,result)=>{
        if(err) console.log(err);
        output.specs=result;
        open()
        console.log("查询specs完成");
      })
    })
  ]).then(function(){
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(output));
    res.end();
    console.log("响应完成!");
  })
})
module.exports=router;