var mysql = require('mysql');
module.exports = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'board_user',
    password:'961107',
    database:'board_db'
});