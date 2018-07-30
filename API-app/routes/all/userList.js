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

exports.user = function(req, res) {
	console.log(req.body.userStatus, "klp")
	var userStatus = req.body.userStatus;
	var updete_sql = "SELECT * FROM user WHERE userStatus=?";
	pool.query(updete_sql, userStatus, function(err, rows) {
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
exports.userPermissions = function(req, res) {
	console.log(req.body.userStatus, "klp")
	var userStatus = req.body.userStatus;
	var updete_sql = "SELECT * FROM user WHERE userStatus=?";
	pool.query(updete_sql, userStatus, function(err, rows) {
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
//用户发布
exports.userSet = function(req, res) {
	var data = req.body;
	var name = data.name; //姓名
	var email = data.email;
	var nameAll = data.nameAll;
	var cardImg1 = data.cardImg1;
	var cardImg2 = data.cardImg2;
	var phone = data.phone;
	var idCard = data.idCard;
	var list = [name, email, nameAll, cardImg1, cardImg2, phone, idCard]
	for(var i = 0; i < list.length; i++) {
		console.log(list[i])
	}
	var updete_sql = "INSERT INTO user(user,email,nameAll,cardImg1,cardImg2,phone,idCard) VALUES (?,?,?,?,?,?,?)";

	pool.query(updete_sql, list, function(err, rows) {
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
exports.userDetail = function(req, res) {
	var id = req.body.id;
	var updete_sql = "SELECT * FROM user WHERE id=?";
	pool.query(updete_sql, id, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {

			return res.json({
				code: '200',
				data: rows[0]
			});
		}
		res.end();
	});
}
exports.userUpload = function(req, res) {
	var id = req.body.id;
	var status = req.body.status;
//	var remark = req.body.remark;
	var list = [status,id]
		console.log(status,id,'pppp')
	
	var updete_sql = "UPDATE user SET userStatus=? WHERE id=?";

	pool.query(updete_sql, list, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			return res.json({
				code: '200',
				data: '更新成功'
			});
		}
		res.end();
	});
}