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
  // mres = readData.match(/(<PATH[^>]*>(.*?)\/>)|(<PATH[^>/]*>(.*?)<\/PATH>)/gi);
  // 取svg标签
  mres = readData.match(/<SVG[^>].*?<\/SVG>/i);
  
  if (!mres || mres.length === 0) {
    return res.send(msg.err('请上传正确的svg文件',null,readData))
  }
  // 替换fill属性为 currentColor
  let result = mres.join('').replace(/fill *= *(\"|\').+?(\"|\')/gi,' fill="currentColor"')
  // 替换width 和 height 属性为 100%
  result = result.replace(/width *= *(\"|\').+?(\"|\')/gi,' width="100%"').replace(/height *= *(\"|\').+?(\"|\')/gi,' height="100%"')
  fs.writeFileSync(req.file.path,result);
  // res.send(msg.ok('文件上传成功',null,req.file.filename))
  res.send(req.file)
});

router.get('/getSvg', ({query:{id}},res) => {
  let readData = fs.readFileSync('upload\\'+id);
  res.send(readData)
})

module.exports = router;