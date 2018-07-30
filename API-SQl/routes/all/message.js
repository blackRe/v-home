var redis = require('../../connect/redis.js');
var pool = require('../../connect/mysql.js');
var url = require('url');
var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
const querystring = require("querystring");
var http = require("http");
var app = express();
//const cookieParser = require('cookie-parser')
//const session = require('express-session');
//const RedisStore = require('connect-redis')(session);

//文件上传 需要下列字段
var multiparty = require('multiparty');
var path = require("path");
var util = require('util');

exports.userMessage = function(req, res) {
	var data=req.body;
//	var delect=data.delect;
	var updete_sql = "SELECT * FROM user a,user_c b ORDER BY a.id DESC  ";
	//var updete_sql = "SELECT * FROM fruit where status=? delect=0 and orderNumber ORDER BY orderNumber DESC";
	pool.query(updete_sql, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			
			return res.json({
				code: '200',
				data: rows
			});
		}
		res.end();
	});
}
exports.deleteOrder = function(req, res) {
	//	连表查询,返回的是listDetail表单的id,如果是a.*，就是listDetail的所有内容
	//	SELECT a.id FROM listDetail a,listAll b WHERE a.id=b.userid
	//	连表查询,返回的是listAll表单的id,如果是b.*,就是listDetail的所内容
	//	SELECT b.id FROM listDetail a,listAll b WHERE a.id=b.userid
	//	连表查询,返回的是listDetail和listAll表单的所内容
	//	SELECT * FROM listDetail a,listAll b WHERE a.id=b.userid
//	delect=0,未删除，1删除
	var id=req.body.id
	var status=1;
	var list=[status,id]
	console.log(id)
	var updete_sql = "UPDATE fruit SET delect=? WHERE id=?";
	
	pool.query(updete_sql, list,function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			
			return res.json({
				code: '200',
				data: '操作成功'
			});
		}
		res.end();
	});
}






















exports.setImg = function(req, res) {

	var form = new multiparty.Form();
	// res.setHeader('text/plain');
	var msg = {
		info: '',
		img: ''
	};
	console.log(__dirname);
	form.encoding = 'utf-8';
	//  需要先创建文件夹,在该目录或者指定目录下创建 uploads
	form.uploadDir = __dirname + "/uploads";

	//设置单文件大小限制
	form.maxFilesSize = 2 * 1024 * 1024;
	//form.maxFields = 1000;  设置所以文件的大小总和
	form.parse(req, function(err, fields, files) {
		if(err) {
			console.log('错误');
			msg.info = '上传失败';
			msg.err = err;
			res.send(msg);
			return;
		}
		console.log(files.files[0].originalFilename, '图片路径');
		var urls = '/uploads/' + files.files[0].originalFilename
		msg.img = path.join(__dirname, urls);
		//		console.log(msg.img);

		msg.info = '上传成功'
		msg.len = files.length;
		//      res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
		res.send(msg);
	});

}