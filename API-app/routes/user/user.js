var redis = require('../../connect/redis.js');
var pool = require('../../connect/mysql.js');
var url = require('url');
var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
const querystring = require("querystring");
//var nodemailer = require('nodemailer');
// var mail = require('./routes/mial/mail');

var app = express();

/**
 * 登陆
 * /api/user/login
 * {
 *   user_name:"",
 *   password:""
 * }
 * return 
 * {
 *   code:"",    状态码
 *   message:"", 状态信息  
 *   data:{}     数据
 * }
// */
//exports.login = function(req, res, next) {
//	console.log("---------------- login --------------");
//	if(!req.session) {
//		return next(new Error('Redis Disconnect'));
//	}
//	if(req.session.user)
//		console.log("1111:", req.session.user);
//	req.session.user = "test";
//	// console.log(req.url);   
//	//接收并处理post提交的body
//	var body = "";
//	req.on('data', function(chunk) {
//		body += chunk;
//	});
//	req.on('end', function() {
//		body = querystring.parse(body);
//		console.log(body);
//		//获取页面参数值
//		var user_name_page = body.user_name;
//		var password_page = body.password;
//		console.log("页面传进来的用户名：" + user_name_page);
//		console.log("页面传进来的密码：" + password_page);
//
//		var select_sql = "SELECT password FROM user WHERE user_name = ?";
//		var sql_password = "";
//		pool.query(select_sql, user_name_page, function(err, result) {
//			if(err) {
//				console.log("[SELECT ERR] - ", err.message);
//
//			}
//			// console.log(result);
//			// console.log(result[0].password);
//			sql_password = result[0].password;
//			// console.log("---------------------登录验证-----------------------------");
//			if(password_page == sql_password) {
//				// console.log("-------------判断密码-------------");
//				res.json({
//					code: '200',
//					message: '登陆成功',
//					data: {}
//				});
//
//				console.log("--------------执行结束------------");
//			} else {
//				res.json({
//					code: '00',
//					message: '登陆失败,用户名和密码不匹配',
//					data: {}
//				});
//			}
//		});
//
//	});
//}

/**
 * 登出
 * /api/user/logout
 * {
 *   user_name:"",
 *   password:"
 * }
 * return 
 * {
 *   code:"",    状态码
 *   message:""  状态信息
 * }
// */
//exports.logout = function(req, res, next) {
//	if(!req.session) {
//		return next(new Error('Redis Disconnect'));
//	}
//	if(req.session.user) {
//		//console.log('准备销毁session')
//		req.session.destroy(function(err) {
//
//			res.json({
//				code: '01',
//				message: ""
//			})
//		})
//	} else {
//		res.json({
//			code: '99',
//			message: "请登录"
//		})
//	}
//}

//exports.sample = function(req, res, next) {
//	//	此处修改
//	//	if (!req.session) {
//	//		return next(new Error('Redis Disconnect'));
//	//	}
//	//	$sql="SELECT * FROM login WHERE id>3";
//	////select * FROM table1 INNER JOIN table2 ON table1 . field1 compopr table2 . field2
//	//$list=getList($sql, "kLP551319zxc");
//	//	if (req.session.user) {
//	console.log('ru')
//	pool.query('SELECT * FROM login WHERE id>3', function(error, results, fields) {
//		//			if (error) throw error;
//		//console.log('The solution is: ', results[0].solution);
//		res.json(results)
//		console.log(JSon.stringify(results))
//		console.log("pppp")
//	});
//
//	//	} else {
//	//		res.json({
//	//			code: '99', message: "请登录"
//	//		})
//	//	}
//}

/**
 * 验证码
 *  
 */
//var svgCaptcha = require('svg-captcha');
//exports.img = function (req, res, next) {
//	var codeConfig = {
//		size: 4,// 验证码长度
//		ignoreChars: '0o1i', // 验证码字符中排除 0o1i
//		noise: 2, // 干扰线条的数量
//		height: 35,
//		width: 100
//	}
//	var captcha = svgCaptcha.create(codeConfig);
//	req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
//  /* var codeData = {
//      img:captcha.data
//  } */
//	res.send(captcha.data);
//	console.log('刷新的验证码' + captcha.text.toLowerCase());
//
//}
/**
 * 验证用户名和验证码
 */
//exports.validate_img = function(req, res, next) {
//	var body = "";
//	req.on('data', function(chunk) {
//		body += chunk;
//	});
//	req.on('end', function() {
//		body = querystring.parse(body);
//
//		console.log(body);
//		//获取页面参数值    
//		var captcha = body.captcha;
//		var session_captcha = req.session.captcha;
//		// console.log('输入框中的数据'+captcha);
//		// console.log('缓存最新数据'+session_captcha);
//
//		var user_name_page = body.email;
//		//定义查询语句
//		var select_sql = "SELECT count(user_name) as count FROM api_portal.user WHERE user_name = ?";
//		pool.query(select_sql, user_name_page, function(err, rows, fields) {
//			if(err) {
//				return res.json({
//					code: '0',
//					message: "数据库查询异常"
//				});
//			}
//			console.log("rows : " + rows[0].count);
//			var count_result = rows[0].count;
//
//			if(count_result == 0) {
//				var insert_sql = "INSERT user(user_name,password) VALUES(?,?)";
//				//为查询参数赋值
//				var name_pass = [user_name_page, 'aaa'];
//				pool.query(insert_sql, name_pass, function(err, results) {
//					if(err) {
//						console.error(err);
//						return res.json({
//							code: '2',
//							message: "数据库插入异常"
//						});
//
//					}
//					if(captcha != session_captcha) {
//
//						return res.json({
//							code: '3',
//							message: "验证码错误"
//						});
//
//					} else {
//
//						res.json({
//
//							code: '1',
//							message: "验证码正确"
//
//						});
//
//					}
//
//				});
//
//				var email = body.email;
//				var transporter = nodemailer.createTransport({
//					service: 'qq',
//					auth: {
//						user: '838676622@qq.com', //开通了stmp的邮箱
//						pass: 'pmcyrscvvaoubcgh' //邮箱的授权码
//
//					}
//				});
//				var mailOptions = {
//					from: '838676622@qq.com', //开通了stmp的邮箱 ,发送者
//					to: email, // 接受者,可以同时发送给多个邮箱,以逗号隔开  
//					subject: '测试邮件', // 标题  
//					html: "<a href= http://192.168.8.113:3000/api/user/checkCode?email=" + email + ">点击激活</a>" // 文本  
//					// html:`<p>啦啦啦啦</p>`
//				};
//
//				transporter.sendMail(mailOptions, function(err, info) {
//					if(err) {
//
//						return res.json({
//							code: '4',
//							message: "邮件发送失败"
//						});
//					}
//
//				});
//
//			} else if(count_result != 0) {
//				return res.json({
//					code: '5',
//					message: "用户名已存在",
//					data: {
//						"user_name": user_name_page
//					}
//				});
//
//			}
//		});
//	});
//
//}
/**
 * 发送邮件，进行注册验证激活
 * 
 */

/*  exports.email=function(req, res, next) {
	var body = "";
	req.on('data', function (chunk) { body += chunk; });
	req.on('end', function () {
		body = querystring.parse(body);

		console.log(body);
		//获取页面参数值    
		var email = body.email;
		var transporter = nodemailer.createTransport({
			service: 'qq',
			auth: {
				user: '838676622@qq.com',  //开通了stmp的邮箱
				pass: 'pmcyrscvvaoubcgh' //邮箱的授权码

			}
		});
		var mailOptions = {
			from: '838676622@qq.com', //开通了stmp的邮箱 ,发送者
			to: email, // 接受者,可以同时发送给多个邮箱,以逗号隔开  
			subject: '测试邮件', // 标题  
			html: "<a href= http://192.168.8.101:3000/api/user/checkCode>点击激活</a>"// 文本  
			// html:`<p>啦啦啦啦</p>`
		};

		transporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				console.log(err);
				return;
			}

			console.log('发送成功');
			res.json('ok');
		});

	});
} */
/**
 * 激活状态
 * 激活后，将checkCode的状态置为 1
 * 
 */
exports.checkCode = function(req, res) {
	//	var username = req.query.email;
	// var code = req.query.code;
	// var outdate = req.query.outdate;
	var updete_sql = "UPDATE user SET check_code = '1' WHERE user_name = ?";
	var sql_value = ['1063560061@qq.com'];

	pool.query(updete_sql, sql_value, function(err, rows, fields) {
		if(err) {
			return res.json({
				code: '6',
				message: "数据库更新异常"
			});

		} else {

			res.writeHead(302, {
				'Location': 'http://localhost:3000/#/register/InputInformation'
			});
			res.end();
		}

	});
}

exports.klp = function(req, res) {
	//			var sql_value = [username];
	var updete_sql = "SELECT * FROM tablist WHERE 1";

	pool.query(updete_sql, function(err, rows, fields) {
		if(err) {
			return res.json({
				code: '6',
				message: "数据库更新异常"
			});
		} else {
			return res.json(fields[0]);
		}
		res.end();
	});
}

exports.login1 = function(req, res) {
console.log(res)
	var updete_sql = "SELECT * FROM tablist WHERE 1";
	pool.query(updete_sql, function(err, rows, fields) {
		if(err) {
			return res.json({
				code: '6',
				message: "数据库更新异常"
			});
		} else {
			
			return res.json({
					code: 200,
					data:fields,
					
				

			});
		}
		res.end();
	});
}

//exports.forget = function(req, res) {
//	var body = "";
//	req.on('data', function(chunk) {
//		body += chunk;
//	});
//	req.on('end', function() {
//		body = querystring.parse(body);
//
//		console.log(body);
//		//获取页面参数值    
//
//		var user_name_page = body.email;
//		//定义查询语句
//		var select_sql = "SELECT count(user_name) as count FROM api_portal.user WHERE user_name = ?";
//		pool.query(select_sql, user_name_page, function(err, rows, fields) {
//			if(err) {
//				console.error(err);
//				return res.json({
//					code: '0',
//					message: "数据库查询异常"
//				});
//			}
//			console.log("rows : " + rows[0].count);
//			var count_result = rows[0].count;
//
//			var mathPass = Math.random().toString(36).substr(2);
//			if(count_result != 0) {
//				var updete_sql = "UPDATE user SET password = ? WHERE user_name = ?";
//				var sql_value = [mathPass, user_name_page];
//
//				pool.query(updete_sql, sql_value, function(err, rows, fields) {
//					if(err) {
//
//						return res.json({
//
//							code: '6',
//							message: "数据库更新异常"
//
//						});
//
//					} else {
//						var email = body.email;
//						var transporter = nodemailer.createTransport({
//							service: 'qq',
//							auth: {
//								user: '838676622@qq.com', //开通了stmp的邮箱
//								pass: 'pmcyrscvvaoubcgh' //邮箱的授权码
//
//							}
//						});
//						var mailOptions = {
//							from: '838676622@qq.com', //开通了stmp的邮箱 ,发送者
//							to: email, // 接受者,可以同时发送给多个邮箱,以逗号隔开  
//							subject: '测试邮件', // 标题  
//							html: "<b>" + mathPass + "</b>" // 文本  
//							// html:`<p>啦啦啦啦</p>`
//						};
//
//						transporter.sendMail(mailOptions, function(err, info) {
//							if(err) {
//
//								return res.json({
//									code: '4',
//									message: "邮件发送失败"
//								});
//							} else {
//								res.json({
//									code: '1',
//									message: "密码已修改并发送至您的邮箱"
//								});
//							}
//
//						});
//
//					}
//
//				});
//			} else {
//				return res.json({
//
//					code: '7',
//					message: "您输入的邮箱未找到"
//
//				});
//
//			}
//		});
//
//	});
//
//}
//
//var fs = require("fs");
//var pathLib = require("path");
//exports.up = function(req, res) {
//
//	console.log(req.files[0]); // 上传的文件信息
//	var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
//	fs.rename(req.files[0].path, newName, function(err) {
//		if(err) {
//			res.send('上传失败');
//		} else {
//			res.send('上传成功');
//		}
//	})
//}