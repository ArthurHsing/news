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

router.get('/list.html', function(req, res){
  // 通过listModel获取所有的数据
  listModel.find().exec(function(err, data){
    res.render('newslist.ejs', {list:data});
  });
});

// 挂载一个保存新增数据的路由save_add.html
router.post('/save_add.html', function(req, res){
  // 接收客户端传过来的POST方式的数据
  var title = req.body.title;
  var author = req.body.author;
  var from = req.body.from;
  var content = req.body.content;

  // 将数据添加到数据库
  var list = new listModel();
  list.title = title;
  list.author = author;
  list.from = from;
  list.content = content;
  list.time = new Date().toLocaleString();
  list.hits = 1;
  list.save(function(){
    res.send('发布成功');
  });
});

// 首页的路由
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
