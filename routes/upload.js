const express = require('express');
const router = express.Router();
const msg = require('../utils/msg');
const multer  = require('multer');
const fs = require('fs')
const upload = multer({ dest: 'upload/' });

router.post('/uploadSvg',upload.single('file'), (req, res) => {
  console.log(req.file)
  let mres = []
  let readData = fs.readFileSync(req.file.path);
  readData = readData.toString()
  mres = readData.match(/<PATH[^>/]*>(.*?)<\/PATH>/gi);
  fs.writeFileSync(req.file.path,mres.join(''));
  res.send(mres)
});

router.get('/getSvg', (req,res) => {
  let readData = fs.readFileSync('upload\\686b6cebe9504c2cd28686124b625493');
  res.send(readData)
})

module.exports = router;