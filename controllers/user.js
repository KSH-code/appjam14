var app, con;


module.exports = (_app, _con) => {
    [app, con] = [_app, _con];
}
module.exports.isLogin = function(req, res, next){
    let { id } = req.body;
    con.query('select * from `users` where `id` = ?', [id], (e, rs) => {
        if(rs) next();
        else res.status(401).end();
    });
}

module.exports.register = function(req, res) {
    let { id, pw, token, name, schoolCode } = req.body;
    let error = false, error_msg = '';
    if(id == undefined && token == 0) error = true, error_msg = '아이디가 입력되지 않았습니다.';
    else if(pw == undefined && token == 0) error = true, error_msg = '비밀번호가 입력되지 않았습니다.';
    else if(id == undefined && token == 1) error = true, error_msg = '잘못된 접근입니다.';
    else if(schoolCode == undefined) error = true, error_msg = '잘못된 접근입니다.';
    else if(name == undefined) error = true, error_msg = '잘못된 접근입니다.';
    else if(token == undefined) error = true, error_msg = '잘못된 접근입니다.';

    if(error) {
        return res.json({ error, error_msg });
    }

    pw = pw || '';
    con.query('select * from `users` where `id` = ?', [id], (e, rs) => {
        if(rs != undefined && token == 1 && rs.length){
            res.status(200).json({ error: error }).end();
        }else if(rs == undefined || !rs.length){
            con.query('insert into `users` (`id`, `pw`, `school_code`, `name`, `token`) values (?, ?, ?, ?, ?)', [id, pw, schoolCode, name, token], (e, rs) => {
                error = e != undefined;
                if(!error) res.status(200).json({ error: error }).end();
                else{
                    console.error(e);
                    error_msg = '알 수 없는 오류';
                    res.json({ error, error_msg });
                }
            });
        }else{
            error = true, error_msg = '중복된 아이디 입니다.';
            res.json({ error, error_msg });
        }
    });
}

module.exports.login = function(req, res) {
    let { id, pw, token } = req.body;
    if(token){
        con.query('select * from `users` where id = ?', [id], (e, rs) => {
            if(rs) res.status(200).end();
            else res.status(400).end();
        });
    }else{
        con.query('select * from `users` where id = ? and pw = ?', [id, pw], (e, rs) => {
            if(rs) res.status(200).end();
            else res.status(400).end();
        });
    }
}

function setInformation(id, name, schoolName){
    con.query('select * from `users` where `id` = ?', [id], (e, rs) => {
        let { idx } = rs.idx;
        if(!e)
            con.query('select * from `schools` where `name` = ?', (e, rs) => {
                if(!e && rs)
                    con.query('update `users` set school_code = ?, name = ? where idx = ?', [rs.no, name, idx]);
                else
                    console.error(e);
            });
        else
            console.error(e);
    });
}