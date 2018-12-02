const express = require('express');
const router = express.Router();
const menuQuery = require('../query/menu');
const msg = require('../utils/msg');
router.get('/getUserMenus', ({session}, res) => {
	// res.json("req")
	const user = session.user;
	
	// let userRoles = user.roles;
	userRoles = '111';
	if(!userRoles) {
		userRoles = [];
	}else {
		userRoles = userRoles.split(';');
	}
	menuQuery.getMenusByUser(userRoles, function(rows) {
		return res.json(msg.ok('查询成功', null, rows));
	});
});

router.get('/getMenus',(req,res) => {
	menuQuery.getMenus(rows => {
		return res.json(msg.ok('查询成功', null, rows));
	})
})

router.get('/saveMenu', ({query, session}, res) => {
	query.modi_time = new Date();
    query.modifer = session.user.id;
    query.modi_name = session.user.name;

	if (!query.id) {
		query.creat_time = new Date();
		query.creater = session.user.id;
		query.modi_name = session.user.name;
	}
	menuQuery.saveMenus(query, rows => {
		return res.json(msg.ok('保存成功', null ,rows ))
	})
})

module.exports = router;