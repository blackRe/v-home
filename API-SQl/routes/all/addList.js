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
	var age = req.body.age; //年龄
	var name = req.body.name; //姓名
	var detail = req.body.detail; //简介
	var img = req.body.img; //上传图片
	var province = req.body.province; //省
	var ctiy = req.body.ctiy; //市	
	var year = req.body.year;
	var number = req.body.number; //汇率
	var phone = req.body.phone; //联系电话
	var qq = req.body.qq; //qq
	var chart = req.body.chart; //微信
	var list = [name, img, number, age, detail, qq, province, ctiy, chart, phone, year]
	for(let i = 0; i < list.length; i++) {
		console.log(list[i])
	}
	//	INSERT INTO `listAll`(`id`, `name`, `img`, `number`, `age`, `detail`, `userid`, `province`, `ctiy`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9])
	var updete_sql = "INSERT INTO `listAll`(`name`, `img`, `number`, `age`, `detail`, `qq`, `province`, `ctiy`, `chart`, `phone`, `year`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

	pool.query(updete_sql, list, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			console.log(rows, 'rowsrowsrowsrows')
			return res.json({
				code: '200',
				data: "操作成功"
			});
		}
		res.end();
	});
}




exports.getShop = function(req, res) {
	//			var sql_value = [username];
	var id = req.body.id; //年龄
 var updete_sql = "SELECT * FROM listAll WHERE id = ?";
	pool.query(updete_sql, id, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			console.log(rows, 'rowsrowsrowsrows')
			return res.json({
				code: '200',
				data:rows[0],
				msg: "数据库查询成功"
			});
		}
		res.end();
	});
}
exports.upload = function(req, res) {
	//			var sql_value = [username];
	var id=req.body.id;
	var age = req.body.age; //年龄
	var name = req.body.name; //姓名
	var detail = req.body.detail; //简介
	var img = req.body.img; //上传图片
	var province = req.body.province; //省
	var ctiy = req.body.ctiy; //市	
	var year = req.body.year;
	var number = req.body.number; //汇率
	var phone = req.body.phone; //联系电话
	var qq = req.body.qq; //qq
	var chart = req.body.chart; //微信
	var list = [name, img, number, age, detail,qq, province, ctiy, chart, phone, year,id]
	for(let i = 0; i < list.length; i++) {
		console.log(list[i])
	}
//	更新数据
	var updete_sql = "UPDATE listAll SET name=?,img=?,number=?,age=?,detail=?,qq=?,province=?,ctiy=?,chart=?,phone=?,year=? WHERE id=?";
	pool.query(updete_sql, list, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			console.log(rows, 'rowsrowsrowsrows')
			return res.json({
				code: '200',
				data: "操作成功"
			});
		}
		res.end();
	});
}
