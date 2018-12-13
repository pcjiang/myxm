//使用express构建web服务器
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors=require("cors");
/*引入路由模块*/
const index=require("./routes/index");
const user=require("./routes/user");
const stroe=require("./routes/stroe")
const detail=require("./routes/detail");

var app = express();
var server = app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static(__dirname+'/public'));
app.use(session({
  secret:'随机字符串',
  cookie:{maxAge:60*1000*30},//过期时间ms
  resave:false,
  saveUninitialized:true
}))
app.use(cors({
    origin:["http://127.0.0.1:3000","http://localhost:3000"],
    credentials:true
}))
/*使用路由器来管理路由*/
app.use("/index",index);
app.use("/user",user)
app.use("/stroe",stroe)
app.use("/detail",detail);

