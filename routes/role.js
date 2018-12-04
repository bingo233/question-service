const express = require('express');
const router = express.Router();
const roleQuery = require('../query/role')
const msg = require('../utils/msg')

router.get('/getRoles', ({query:{name}}, res) => {
  let params = []
  if (name) {
    params = [{name:name}]
  } else {
    params = [true]
  }
  roleQuery.queryRoleList(params, result => {
    res.json(msg.ok('查询成功', null, result))
  })
})

module.exports = router
