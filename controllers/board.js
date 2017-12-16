var app, con;
const fs = require('fs');
const dir = __dirname.substr(0, __dirname.length - 11);
module.exports = (_app, _con) => {
    [app, con] = [_app, _con];
}

module.exports.write = function(req, res) {
    let { id, writer, content, subject } = req.body;
    let error = false, error_msg = '';
    let { img } = req.files || {};

    if(id == undefined || writer == undefined)
        error = true, error_msg = '잘못된 접근 입니다.';
    else if(content == undefined || !content.length)
        error = true, error_msg = '내용을 입력해주세요.';
    else if(subject == undefined || !subject.length)
        error = true, error_msg = '과목을 입력해주세요.';
    
    if(error) return res.json({error, error_msg});

    con.query('insert into `board` (`title`, `content`, `writer`, `subject`, `created_date`) values (?, ?, ?, ?, now())', ['', content, writer, subject], (e, rs) => {
        if(e) console.error(e), error = true, error_msg = '알 수 없는 오류!'
        else res.status(200).json({error}).end();
        if(img && !e){
            fs.mkdir(`${dir}public/img/${rs.insertId}`, (e) => {
                fs.writeFile(`${dir}public/img/${rs.insertId}/1.png`, img.data);
            })
        }
    });
}

module.exports.loadList = function(req, res) {
    new Promise((resolve, reject) => {
        con.query('select * from `board`', (e, rs) => {
            resolve({ e, rs });
        });
    }).then(data => {
        let { e, rs } = data;
        if(e) console.error(e);
        if(!e){
            let list = [], cnt = 0;
            for(let { idx, content, writer, check, subject, created_date } of rs){
                con.query('select count(*) as count from `comments` where `idx` = ?', [idx], (e, rs) => {
                    let img = fs.existsSync(`${dir}public/${idx}/a.png`) ? 1 : 0;
                    list.push({ idx, content, writer, check, subject, created_date: created_date.toISOString().split("T")[0], img, commentCount: rs[0].count });
                    cnt++;
                    if(cnt == rs.length) res.json({ list });
                });
            }
            if(rs.length == 0) res.json({ list });
        }
    });

}

module.exports.writeComment = function(req, res){
    let { writer, content } = req.body;
    let { postIdx } = req.params;
    con.query('insert into `comments` (`post_idx`, `content`, `writer`, `created_date`) values (?, ?, ?, now())', [postIdx, content, writer], (e, rs) => {
        if(!e || !rs.length) res.status(400).end();
        else res.status(200).end();
    });
}

module.exports.loadComments = function(req, res){
    let { idx } = req.params;
    con.query('select * from `comments` where `post_idx` = ?', [idx], (e, rs) => {
        let list = [];
        for(let { content, writer, check, created_date } of rs){
            list.push({ content, writer, check, created_date: created_date.toISOString().split("T")[0] });
        }
        res.json({ list });
    });
}

module.exports.checkComment = function(req, res){
    let { postWriter } = req.body;
    let { postIdx, commentIdx } = req.params;

    con.query('update `board` set `check` = ? where writer = ?', [postIdx, postWriter], (e, rs) => {
        if(!e) console.error(e), res.status(400).end();
        else con.query('update `comments` set `check` = ? where commentIdx = ?', [postIdx, commentIdx], (e, rs) => {
            if(!e) console.error(e), res.status(400).end();
            else res.status(200).end();
        });
    });
}