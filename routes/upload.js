const express = require('express');
const router = express.Router();
const msg = require('../utils/msg');
const multer  = require('multer');
const fs = require('fs')
const upload = multer({ dest: 'upload/' });

router.post('/uploadSvg',upload.single('file'), (req, res) => {
  let mres = []
  let readData = fs.readFileSync(req.file.path);
  readData = readData.toString()
  // mres = readData.match(/<PATH[^>/]*>(.*?)<\/PATH>/gi);
  mres = readData.match(/(<PATH[^>]*>(.*?)\/>)|(<PATH[^>/]*>(.*?)<\/PATH>)/gi);
  if (!mres || mres.length === 0) {
    return res.send(msg.err('请上传正确的svg文件',null,readData))
  }
  fs.writeFileSync(req.file.path,mres.join(''));
  res.send(mres)
});

router.get('/getSvg', ({query:{id}},res) => {
  let readData = fs.readFileSync('upload\\'+id);
  res.send(readData)
})

module.exports = router;