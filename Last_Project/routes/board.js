var express = require('express');
var connection = require('../db/mysql');

var router = express.Router();

/* board list page */
router.get('/list', function(req, res, next) {

    connection.query('select * from t_board', function(err, rows){
        if(err) {
            res.render('boardList', {'status':'Error'});
        } else {
            res.render('boardList', {'status':'OK', 'data':rows});
        }
    });
});

/* board Register page */
router.get('/register', function(req, res, next) {
    res.render('boardRegister');
});

/* board Register page */
router.get('/update', function(req, res, next) {
    res.render('boardUpdate');
});

module.exports = router;
