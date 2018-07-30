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
	var updete_sql = "SELECT * FROM listAll WHERE id = ?";;
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
				data: rows[0],
				msg: "数据库查询成功"
			});
		}
		res.end();
	});
}
exports.order = function(req, res) {

	//	更新数据
	var updete_sql = "SELECT id,user,status,statusName,user_card,count,parcie FROM `orderList` WHERE 1";
	pool.query(updete_sql, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {

			return res.json({
				code: '200',
				data: rows,
				msg: "查询成功"
			});
		}
		res.end();
	});
}
exports.orderDetail = function(req, res) {
	var id = req.body.id; //年龄
	//	console.log(Date.now(),"获取时间")

	//console.log(newTime,'shijian');
	//	更新数据
	var updete_sql = "SELECT * FROM orderList WHERE id = ?";
	pool.query(updete_sql, id, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			console.log(rows, '详情')
			return res.json({
				code: '200',
				data: rows[0],
				msg: "查询成功"
			});
		}
		res.end();
	});
}

exports.add = function(req, res) {
	var user = req.body.user; //用户明
	var user = req.body.user; //用户名
	var name = req.body.name; //真是姓名
	var productName = req.body.productName; //产品名称
	var phone = req.body.phone; //联系电话
	var unit = req.body.unit; //单位元，美元
	var unit1 = req.body.unit1; //斤两
	var count = req.body.count; //数量
	var parcie = req.body.parcie; //单价
	var discount = req.body.discount; //折扣
	var status = 1; //订单状态，1
	var statusName = '未完成';
	console.log(Date.now(), "获取时间")
	var a = Date.now()
	var tt = new Date(a).getTime();
	var nowTime = new Date(tt); //年月日的时间戳
	var user_card = a + Math.floor(Math.random() * 10 + 1);
	var list = [user, name, productName, phone, unit, unit1, user_card, status, statusName, count, parcie, discount, nowTime]

	//	增加
	var updete_sql = "INSERT INTO `orderList`(`user`, `name`, `productName`, `phone`, `unit`, `unit1`, `user_card`, `status`, `statusName`, `count`, `parcie`, `discount`, `NowTime`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
	pool.query(updete_sql, list, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			console.log(rows, '详情')
			return res.json({
				code: '200',
				data: rows[0],
				msg: "添加成功"
			});
		}
		res.end();
	});
}
exports.upload = function(req, res) {
	var id = req.body.id;
	var user = req.body.user; //用户明
	var user = req.body.user; //用户名
	var name = req.body.name; //真是姓名
	var productName = req.body.productName; //产品名称
	var phone = req.body.phone; //联系电话
	var unit = req.body.unit; //单位元，美元
	var unit1 = req.body.unit1; //斤两
	var count = req.body.count; //数量
	var parcie = req.body.parcie; //单价
	var discount = req.body.discount; //折扣
	var status = req.body.status; //订单状态，1
	var statusName = '';
	if(status == 1) {
		statusName = '未完成';
	} else if(status == 2) {
		statusName = '完成';
	} else {
		statusName = '超时';
	}

//	console.log(Date.now(), "获取时间")
	var a = Date.now()
	var tt = new Date(a).getTime();
	var nowTime = new Date(tt); //年月日的时间戳
	
	var user_card = a + Math.floor(Math.random() * 10 + 1);
	var list = [user, name, productName, phone, unit, unit1, status, statusName, count, parcie, discount, id]
console.log(list)
	//	增加

	var updete_sql = "UPDATE orderList SET user=?,name=?,productName=?,phone=?,unit=?,unit1=?,status=?,statusName=?,count=?,parcie=?,discount=? WHERE id=?";
	pool.query(updete_sql, list, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			console.log(rows, '详情')
			return res.json({
				code: '200',
				data: rows[0],
				msg: "添加成功"
			});
		}
		res.end();
	});
}

exports.delect = function(req, res) {
	var id = req.body.id;
	console.log(id,"id")
	//	增加
	var updete_sql = "DELETE FROM orderList WHERE id=?";
	pool.query(updete_sql, id, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			console.log(rows, '详情')
			return res.json({
				code: '200',
				data: rows[0],
				msg: "删除成功"
			});
		}
		res.end();
	});
}
exports.sorting = function(req, res) {
	var NowTime = req.body.NowTime;
//	var id=req.body.id;
//	var updete_sql="";
	//	增加
	if(NowTime==1){
//		正序
		updete_sql = "SELECT * FROM `orderList` ORDER BY id ASC ";
	}else{
//		倒叙
		updete_sql = "SELECT * FROM `orderList` ORDER BY id DESC ";
	}
	pool.query(updete_sql, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {
			console.log(rows, '详情')
			return res.json({
				code: '200',
				data: rows,
				msg: "排序成功"
			});
		}
		res.end();
	});
}