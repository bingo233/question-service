const express = require('express');
const router = express.Router();
const roleSql = require('../query/menu');
const msg = require('../utils/msg');

router.get('/getMenus', ({session}, res) => {
	// res.json("req")
	const user = session.user;
	
	// let userRoles = user.roles;
	userRoles = '111';
	if(!userRoles) {
		userRoles = [];
	}else {
		userRoles = userRoles.split(';');
	}
	roleSql.getMenusByUser(userRoles, function(rows) {
		return res.json(msg.ok('查询成功', null, rows));
	});
});

module.exports = router;