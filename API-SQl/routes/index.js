var express = require('express');
var router = express.Router();

var allModules = {
	user: require('./user/user.js'),
	klp: require('./klp/klp.js'),
	getList: require('./klp/addList.js'),
	order: require('./order/order.js'),//订单
}

// ͨ��ģ��·��
router.all('/api/:module/:action', function(req, res, next) {
	allModules[req.params.module][req.params.action](req, res, next);
})

module.exports = router;