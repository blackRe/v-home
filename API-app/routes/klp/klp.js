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

exports.loginAll = function(req, res) {
	//			var sql_value = [username];
	var name = req.body.name;
	var pwd = req.body.pwd;
	console.log(name);
	var updete_sql = "SELECT * FROM login WHERE name = ?";

	pool.query(updete_sql, name, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			for(var i = 0; i < rows.length; i++) {
				if(rows[i].pwd == pwd) {
					return res.json({
						code: '200',
						data: "登陆成功"
					});
				} else {
					return res.json({
						code: '400',
						data: "登陆失败"
					});
				}
			}
			//			return res.json({
			//				code:'200',
			//				data:rows
			//			});
		}
		res.end();
	});
}

exports.list = function(req, res) {
	//	连表查询,返回的是listDetail表单的id,如果是a.*，就是listDetail的所有内容
	//	SELECT a.id FROM listDetail a,listAll b WHERE a.id=b.userid
	//	连表查询,返回的是listAll表单的id,如果是b.*,就是listDetail的所内容
	//	SELECT b.id FROM listDetail a,listAll b WHERE a.id=b.userid
	//	连表查询,返回的是listDetail和listAll表单的所内容
	//	SELECT * FROM listDetail a,listAll b WHERE a.id=b.userid
	var updete_sql = "SELECT * FROM fruit WHERE 1";

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
exports.classDetail = function(req, res) {
	//	连表查询,返回的是listDetail表单的id,如果是a.*，就是listDetail的所有内容
	//	SELECT a.id FROM listDetail a,listAll b WHERE a.id=b.userid
	//	连表查询,返回的是listAll表单的id,如果是b.*,就是listDetail的所内容
	//	SELECT b.id FROM listDetail a,listAll b WHERE a.id=b.userid
	//	连表查询,返回的是listDetail和listAll表单的所内容
	//	SELECT * FROM listDetail a,listAll b WHERE a.id=b.userid
	var userid = req.body.id
	console.log(userid)
	var updete_sql = "SELECT * FROM fruit WHERE id=?";
	pool.query(updete_sql, userid, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
		console.log(rows,"klp")
			return res.json({
				code: '200',
				data: rows[0]
			});
		}
		res.end();
	});
}

exports.listDetail = function(req, res) {
	//	连表查询,返回的是listDetail表单的id,如果是a.*，就是listDetail的所有内容
	//	SELECT a.id FROM listDetail a,listAll b WHERE a.id=b.userid
	//	连表查询,返回的是listAll表单的id,如果是b.*,就是listDetail的所内容
	//	SELECT b.id FROM listDetail a,listAll b WHERE a.id=b.userid
	//	连表查询,返回的是listDetail和listAll表单的所内容
	//	SELECT * FROM listDetail a,listAll b WHERE a.id=b.userid
	var userid = req.body.id
	console.log(userid)
	var updete_sql = "SELECT * FROM listAll a,listDetail b WHERE a.userId=b.id and a.userId=?";
	pool.query(updete_sql, userid, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			var allList = "";
			console.log(rows)
			//			for(var  i=0;i<rows.length;i++){
			//				if(rows[i].id==userid){
			//					allList=rows[i];
			//					console.log(allList)
			//				}
			//			}

			return res.json({
				code: '200',
				data: rows[0]
			});
		}
		res.end();
	});
}

exports.setUser = function(req, res) {
	var name = req.body.name;
	var pwd = req.body.pwd;
	var phone = req.body.phone;
	if(name == '') {
		return res.json({
			code: 200,
			data: 'name不能为空'
		});
		return false
	}
	if(pwd == '') {
		return res.json({
			code: 200,
			data: '密码不能为空'
		});
		return false
	}
	if(phone == '') {
		return res.json({
			code: 200,
			data: '电话不能为空'
		});
		return false
	}

	var all = [name, pwd, phone]
	console.log(all)
	var updete_sql = "INSERT INTO login( name, pwd, phone) VALUES (?,?,?)";
	//	fields 含义
	pool.query(updete_sql, all, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				message: "数据库更新异常"
			});
		} else {
			//			rows 是返回值得结果
			//			console.log(JSON.stringify(rows))

			return res.json({
				code: 200,
				data: '添加成功'
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