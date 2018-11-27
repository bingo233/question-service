const express = require('express');
const router = express.Router();

// 启动页面
router.get('/',(req, res, next) => {
	res.json('{aaa:111}');
});

module.exports = router;