var app, con;
module.exports = (_app, _con) => {
    [app, con] = [_app, _con];
}
module.exports.getSchoolList = function(req, res){
    const { schoolName } = req.query;
    con.query('select * from `schools` where `name` like ?', [`%${schoolName}%`], (e, rs) => {
        if(!e && rs.length){
            jsonData = {
                schoolList: rs
            }
            res.json(jsonData);
        }else{
            res.status(400).end();
        }
    });
}