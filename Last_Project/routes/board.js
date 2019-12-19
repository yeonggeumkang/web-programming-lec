var express = require('express');
var connection = require('../db/mysql');

var router = express.Router();

/* board list page */
router.get('/list', function(req, res, next) {

    connection.query('select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from t_board', function(err, rows){
        if(err) {
            res.render('boardList', {'status':'Error'});
        } else {
            res.render('boardList', {'status':'OK', 'data':rows});
        }
    });
});

router.post('/list', function(req, res, next){
    console.log("post list acces");
    //var sqlSearch = 'select * from t_board where title like "%?%"';
    var search = '%'+req.body.searchKeyword +'%'
    connection.query('select * from t_board where title LIKE ?', search, function(err, rows){
        if(err) {
            console.log("err");
            res.redirect('/list');
        } else {
            console.log(rows);
            res.render('boardList', {'status':'OK', 'data':rows});
        }
    });
});

/* board Register page */
router.get('/register', function(req, res, next) {
    res.render('boardRegister');
});

/* board register process ajax */
router.post('/register/process', function(req, res, next) {

    var sql = 'insert into t_board (user_id, user_name, title, content) ' +
                'values(?,?,?,?)';
    var values = [req.session.login_id, 
                    req.session.user_name,
                    req.body.board_title,
                    req.body.board_content];
    connection.query(sql, values, function(err, result){
        if(err) {
            res.json({'status':'Error'});
        } else {
            console.log(result);
            if(result.insertId != 0) {
                res.json({'status':'OK'});
            } else {
                res.json({'status':'Error'});
            }
        }
    });
});

/* board update page */
router.get('/update', function(req, res, next) {
    console.log(req.query.bid);
    //res.render('boardUpdate');
    connection.query('SELECT * FROM t_board where bid=?', req.query.bid, function(err, rows){
        if(err){
            console.log(err);
            res.redirect('/board/list');
        } else {
            res.render('boardUpdate', {'data':rows[0]});
        }
    });
});

/* board update process ajax */
router.post('/update/process', function(req, res, next) {
    console.log(req.body.board_title, req.body.board_content, req.body.bid);
    var sql = 'update t_board set title=?, content=? where bid=?';
    var values = [req.body.board_title, req.body.board_content, req.body.bid];
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

/* board delete process ajax */
router.post('/delete/process', function(req, res, next) {
    console.log(req.body.board_title, req.body.board_content, req.body.bid);
    var sql = 'delete from t_board where bid=?';
    connection.query(sql, req.body.bid, function(err, result){
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
