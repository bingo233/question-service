const express = require('express');
const router = express.Router();
const userSql = require('../query/user');
const msg = require('../utils/msg');

// router.post('/loginCheck', ({query: {acc, pwd}, session}, res) => {
// 	// res.json("req")
// 	userSql.checkUser([acc, pwd],(user) => {
// 		if(user){
// 			console.log(user,'22222222222222222222222222')
// 			return session.regenerate(err => {
// 				if(err) {
// 					return res.json(msg.creatMsg('登录失败',555,'请重新尝试',false))
// 				}
// 				delete user.pwd;
// 				session.user = user;
// 				return res.json(msg.ok('登录成功',null,session.id));
// 			})
// 		}
// 		return res.json(msg.creatMsg('登录失败',555,'用户名或密码错误！',false));
// 	});
  
// });

router.post('/loginCheck', (req, res) => {
	// res.json("req")
	let acc = req.query.acc;
	let pwd = req.query.pwd;

	userSql.checkUser([acc, pwd],(user) => {
		if(user){
			req.session.regenerate(function(err){
			if(err) {
				return res.json(msg.creatMsg('登录失败',555,'请重新尝试',false))
			}
			delete user.pwd;
			req.session.user = user;
			return res.json(msg.ok('登录成功',null,req.session.id));
			})
		}else {
			return res.json(msg.creatMsg('登录失败',555,'用户名或密码错误！',false));
		}
		
	});
  
});

module.exports = router;