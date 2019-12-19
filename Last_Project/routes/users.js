var express = require('express');
var connection = require('../db/mysql');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  console.log("hello");
  connection.query('select * from t_user', function(err, rows){
      if(err) {
          res.render('usersList', {'status':'Error'});
      } else {
          res.render('usersList', {'status':'OK', 'data':rows});
      }
  });
});

/* list delete page */
router.get('/delete', function(req, res, next) {
  console.log(req.query.uid);
  connection.query('delete FROM t_user where uid=?', req.query.uid, function(err, rows){
      if(err){
          console.log(err);
          res.redirect('/users/list');
      } else {
          res.redirect('/users/list');
      }
  });
});

/* users update page */
router.get('/update', function(req, res, next) {
  console.log(req.query.uid);
  //res.render('boardUpdate');
  connection.query('SELECT * FROM t_user where uid=?', req.query.uid, function(err, rows){
      if(err){
          console.log(err);
          res.redirect('/users/list');
      } else {
          res.render('usersUpdate', {'data':rows[0]});
      }
  });
});

/* users update process ajax */
router.post('/update/process', function(req, res, next) {
  console.log('process 접근');
  var sql = 'update t_user set login_id=?, login_pwd=?, user_name=?, email=? where uid=?';
  var values = [req.body.login_id, req.body.login_pwd, req.body.name, req.body.email, req.body.uid];
  connection.query(sql, values, function(err, result){
      if(err) {
          console.log(err);
          res.json({'status':'Error'});
      } else {
          console.log(result);
          res.json({'status':'OK'});
      }
  });
});

module.exports = router;
