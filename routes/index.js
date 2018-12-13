var express=require("express");
const router=express.Router();
const pool=require=require("../pool");

//index
router.get("/",(req,res)=>{
    var sql=`select * from cc_product`;
    pool.query(sql,(err,result)=>{
        if(err) throw error;
        //res.send(result)
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
          })
          res.write(JSON.stringify(result));
          res.end();
    })
})
router.get("/imagelist",(req,res)=>{
    var sql="SELECT img FROM `xz_index_carousel`";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
module.exports=router;