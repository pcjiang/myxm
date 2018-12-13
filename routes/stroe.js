const express=require("express")
const router=express.Router()
const pool=require("../pool")

//测试地址: http://localhost:3000/stroe?kwords=macbook i5 128g
router.get("/",(req,res)=>{
           //bodyParser:url.parse(req.url,true)
  var kwords=req.query.kwords;
  //"macbook i5 128g"
  console.log(kwords);
  var arr=kwords.split(" ")//arr[macbook,i5,128g]
  for(var i=0;i<arr.length;i++){
    arr[i]=`title like '%${arr[i]}%'`
  }//arr[title like '%macbook%', ... ]
  var where=" where "+arr.join(" and ")
  // where title like '%macbook%' and title like '%i5%' and title like '%128g%'
  //要回发客户端的支持分页的对象
  var output={ pageSize:9 } //每页9个商品
  output.pno=req.query.pno;
  var sql="SELECT *,( SELECT md from xz_laptop_pic where laptop_id=lid limit 1 ) as md FROM xz_laptop ";
  pool.query(sql+where,[],(err,result)=>{
    if(err) console.log(err);
    output.count=result.length;//获得总记录数
    output.pageCount=Math.ceil(//计算总页数
      output.count/output.pageSize);
    output.products=//截取分页后的结果集
      result.slice(output.pno*9,output.pno*9+9);

    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(output))
    res.end()
  })
})

module.exports=router;