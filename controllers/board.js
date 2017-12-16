var app, con;
const fs = require('fs');

module.exports = (_app, _con) => {
    [app, con] = [_app, _con];
}

module.exports.write = function(req, res) {
    let { id, writer, content, subject } = req.body;
    let error = true, error_msg = '';
    let { img } = req.files || {};

    if(id == undefined || writer == undefined)
        error = true, error_msg = '잘못된 접근 입니다.';
    else if(content == undefined || !content.length)
        error = true, error_msg = '내용을 입력해주세요.';
    else if(subject == undefined || !subject.length)
        error = true, error_msg = '과목을 입력해주세요.';
    
    if(error) return res.json({error, error_msg});

    con.query('insert into `board` (`title`, `content`, `writer`, `subject`, `created_date`) values (?, ?, ?, ?, now())', [title, content, writer, subject], (e, rs) => {
        if(e) console.error(e), error = true, error_msg = '알 수 없는 오류!'
        else res.status(200).json({error}).end();
        if(img){
            fs.write
        }
    });
}