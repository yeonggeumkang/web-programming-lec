var mysql = require('mysql');
module.exports = mysql.createConnection({
    host:'115.145.20.171',
    port:3306,
    user:'board_user',
    password:'skkutest',
    database:'board_db'
});