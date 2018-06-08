//入口文件
//加载express模块
var express = require('express');
const path = require('path');
//加载bodyparser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//http.createServer
var app = express();


//设置静态文件托管（静态处理）
// 部署上线时读取静态文件
app.use(express.static(path.join(__dirname, '../dist')));
//bodyParser设置
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.listen(8088);
