const express = require('express');
const router = express.Router();
const msg = require('../utils/msg');
const userQuery = require('../query/user')

router.get('/getUserList', ({query:{page=1,length=10,userName}},res) => {
    let params = {
        page: page,
        length: 10,
        user_name: userName
    }
    userQuery.queryUserByPage([{}], result => {
        res.json(msg.ok('查询成功', null, result))
    })
})