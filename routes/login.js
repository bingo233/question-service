const express = require('express');
const router = express.Router();
const userSql = require('../query/user');
const msg = require('../utils/msg');

router.post('/loginCheck', ({query: {acc, pwd}, session}, res) => {
	// res.json("req")
	userSql.checkUser([acc, pwd],(user) => {
		if(user){
			delete user.pwd;
			session.user = user;
			return res.json(msg.ok('登录成功',null,session.id));
		}
		return res.json(msg.creatMsg('登录失败',555,'用户名或密码错误！',false));
	});
  
});

module.exports = router;