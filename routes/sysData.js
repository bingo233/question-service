const express = require('express');
const router = express.Router();
const dataQuery = require('../query/sysData');
const msg = require('../utils/msg');
const UUID = require('uuid');

router.get('/queryAll', (req, res) => {
  dataQuery.queryAll(rows => {
    res.json(msg.ok('查询成功', null, rows))
  })
})

router.get('/queryData', (req, res) => {
  dataQuery.queryData(req.query, rows => {
    res.json(msg.ok('查询成功', null, rows))
  })
})

router.post('/deleteData', (req,res) => {
  dataQuery.deleteById(req.query.id, rows => {
    res.json(msg.ok('删除成功'))
  })
})

router.post('/saveData', (req, res) => {
  let data = req.query;
  data.modify_time = new Date()
  data.modify_name = req.session.user.name
  data.modifer = req.session.user.id
  if (data.id) {
    dataQuery.updateData([data,data.id], () => {
      res.json(msg.ok('保存成功'))
    })
  } else {
    data.id = UUID.v1();
    data.create_time = new Date()
    data.create_name = req.session.user.name
    data.creater = req.session.user.id
    dataQuery.saveData(data, () => {
      res.json(msg.ok('保存成功'))
    })
  }
  
})

module.exports = router;