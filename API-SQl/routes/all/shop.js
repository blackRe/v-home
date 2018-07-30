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

exports.classAll = function(req, res) {
	var updete_sql = "SELECT * FROM class WHERE 1";
	pool.query(updete_sql, function(err, rows) {
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
exports.setShop = function(req, res) {

	var c_time = new Date().getTime() / 1000;
	var u_time = new Date().getTime() / 1000;
	console.log(u_time, 'u_time')
	//	var id=req.body.id;
	var name = req.body.name; //姓名
	var count = req.body.count; //数量
	var price = req.body.price; //单价
	var unit = req.body.unit; //单价
	var class1 = req.body.class1;
	var baby = req.body.baby;
	var discount = req.body.discount; //折扣
	var img1 = req.body.img1; //图片
	var img2 = req.body.img2; //图片
	var img3 = req.body.img3; //图片
	var deliveryPrice = req.body.deliveryPrice; //快递单费用
	var province = req.body.province; //省
	var ctiy = req.body.ctiy; //市
	var store = req.body.store; //店铺地址
	var video = req.body.video; //店铺视屏
	var detail = req.body.detail; //简介
	var phone = req.body.phone; //电话	var list = [name, img, number, age, detail,qq, province, ctiy, chart, phone, year,id]

	var list = [c_time, u_time, name, count, price, unit, class1, discount, img1, img2, img3, deliveryPrice, province, ctiy, store, baby, video, detail, phone]

	//		var list=[c_time,u_time,name,count,price,unit,class1,discount,img1,img2,img3,deliveryPrice,province,ctiy,store,baby,video,detail,phone]
	for(let i = 0; i < list.length; i++) {
		console.log(list[i])
	}
	//	return
	//	更新数据
	//	var updete_sql = "UPDATE fruit SET u_time=?,name=?,count=?,price=?,unit=?,class=?,discount=?,img1=?,img2=?,img3=?,deliveryPrice=?,province=?,ctiy=?,store=?,baby=?,video=?,detail=?,phone=? WHERE id=?";
	//	创建数据								
	var updete_sql = "INSERT INTO fruit (c_time,u_time,name,count,price,unit,class,discount,img1,img2,img3,deliveryPrice,province,ctiy,store,video,detail,phone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	pool.query(updete_sql, list, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {

			return res.json({
				code: '200',
				data: "操作成功"
			});
		}
		res.end();
	});
}

exports.upload = function(req, res) {

	var id = req.body.id;
	var name = req.body.name; //姓名
	var count = req.body.count; //数量
	var price = req.body.price; //单价
	var unit = req.body.unit; //单价
	var class1 = req.body.class1;
	var baby = req.body.baby;
	var discount = req.body.discount; //折扣
	var img1 = req.body.img1; //图片
	var img2 = req.body.img2; //图片
	var img3 = req.body.img3; //图片
	var deliveryPrice = req.body.deliveryPrice; //快递单费用
	var province = req.body.province; //省
	var ctiy = req.body.ctiy; //市
	var store = req.body.store; //店铺地址
	var video = req.body.video; //店铺视屏
	var detail = req.body.detail; //简介
	var phone = req.body.phone; //电话	var list = [name, img, number, age, detail,qq, province, ctiy, chart, phone, year,id]
	//		int 存储最大未11位，需要除1000
	var u_time1 = new Date().getTime() / 1000
	var list = [u_time1, name, count, price, unit, class1, discount, img1, img2, img3, deliveryPrice, province, ctiy, store, baby, video, detail, phone, id]
	//	更新数据
	var updete_sql = "UPDATE fruit SET u_time=?,name=?,count=?,price=?,unit=?,class=?,discount=?,img1=?,img2=?,img3=?,deliveryPrice=?,province=?,ctiy=?,store=?,baby=?,video=?,detail=?,phone=? WHERE id=?";
	pool.query(updete_sql, list, function(err, rows) {
		if(err) {
			return res.json({
				code: '6',
				data: "数据库更新异常"
			});
		} else {

			return res.json({
				code: '200',
				data: {
					data: "操作成功"
				}
			});
		}
		res.end();
	});
}

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
	var updete_sql = "SELECT * FROM fruit u_time ORDER BY u_time DESC";

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