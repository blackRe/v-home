const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const http = require('http');

const redis = require('./connect/redis.js');

//redis.set('klp','ppppp')
const index = require('./routes/index.js');
//————————————————————
const app = express();



// var testController=require('./routes/upload/testController.js');
// app.post('/api/klp/setImg',testController.dataInput);


var bodyParser = require('body-parser')//处理接受结果
// 创建 application/x-www-form-urlencoded 解析
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(cookieParser('api_session'));
app.use(session({
  store: new RedisStore({
    client: redis,
    prefix: 'api_session:'
  }),
  cookie: { maxAge: 1 * 60 * 60 * 1000 }, //默认1小时
  secret: 'api_session',
  resave: true,
  saveUninitialized: true
}));
//const multer  = require('multer');

//var objmulter = multer({dest:'./API-New/routes/user/upload/'});

//app.use(objmulter.any());
/* app.use('/',function(req,res){
    console.log(req.files);
}); */
app.use('/', index) 
//全局error中间件

app.use(function(err, req, res, next) {
  console.log("Error happens", err.stack);
});
const httpServer = http.createServer(app);
httpServer.listen(3000, function() {
  console.log('HTTP Server is running on: http://localhost:%s', 3000);
});
 