var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入mongoose模块

// 1.连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/news', { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
  if (err){
    throw err;
  } else {
    console.log('数据库连接成功');
  }
});

// 2.定义骨架
var listSchema = new mongoose.Schema({
  title: String,
  author: String,
  from: String,
  content: String,
  time: String,
  hits: Number
});

// 3.创建模型
var listModel = mongoose.model('list', listSchema, 'list');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
