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
    var list = [], cnt = 0;    
    new Promise((resolve, reject) => {
        con.query('select COUNT(c.post_idx) as count, a.idx, a.content, a.writer, a.check, a.subject, a.created_date from `board` as `a` INNER JOIN `comments` as `c` ON `a`.idx = `c`.post_idx GROUP BY `a`.idx', (e, rs) => {
            resolve({ e, rs });
        });
    }).then(data => {
        let { e, rs } = data;
        if(e) console.error(e);
        if(!e){
            for(var { idx, content, writer, check, subject, created_date } of rs){
                list.push({ idx, content, writer, check, subject, created_date: created_date.toISOString().split("T")[0], img:0, commentCount: rs[0].count });
            }
            res.json({ list });
        }
    }).then(f => {
        res.json({ list });
    });

}

module.exports.writeComment = function(req, res){
    let { writer, content } = req.body;
    let { idx } = req.params;
    con.query('insert into `comments` (`post_idx`, `content`, `writer`, `created_date`) values (?, ?, ?, now())', [idx, content, writer], (e, rs) => {
        if(e || rs == undefined) res.status(400).end();
        else res.status(200).end();
    });
}

module.exports.loadComments = function(req, res){
    let { idx } = req.params;
    con.query('select * from `comments` where `post_idx` = ?', [idx], (e, rs) => {
        let list = [];
        for(let { content, writer, check, created_date, idx } of rs){
            list.push({ idx, content, writer, check, created_date: created_date.toISOString().split("T")[0] });
        }
        res.json({ list });
    });
}

module.exports.checkComment = function(req, res){
    let { postWriter } = req.body;
    let { postIdx, commentIdx } = req.params;

    con.query('update `board` set `check` = ? where writer = ?', [postIdx, postWriter], (e, rs) => {
        if(e != undefined) console.error(e), res.status(400).end();
        else con.query('update `comments` set `check` = ? where idx = ?', [postIdx, commentIdx], (e, rs) => {
            if(e != undefined) console.error(e), res.status(400).end();
            else res.status(200).end();
        });
    });
}