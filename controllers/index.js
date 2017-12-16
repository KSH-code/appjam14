var app;

const mysql = require('mysql');
const fs = require('fs');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'talkhak',
    charset: "utf8_general_ci"
});
con.connect();

module.exports = _app => {
    app = _app;
    fs.readdir(`${__dirname}`, (e, fileList) => {
        for(let fileName of fileList){
            if(fileName == 'index.js') continue;
            require(`./${fileName}`)(app, con);
        }
    });
}