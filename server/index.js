var spider = require("./service/spiderService");
spider(); //更新数据
var express = require("express");

var app = express();

app.use(express.json()); //解析json格式的body
app.use(express.urlencoded({ extended: false })); //解析urlencoded格式的body

//下面两行代码是为了解决服务端单页应用程序history模式的问题
//详情见：https://www.npmjs.com/package/connect-history-api-fallback
var history = require('connect-history-api-fallback');
app.use(history());

app.use(express.static("public")); //映射静态资源的位置
app.use("/imgs", express.static("imgs")); //映射静态资源的位置


// 当请求地址以/api/student开头时，交给路由 student 处理
app.use("/api/movie", require("./router/movie"))
app.listen(9527);

