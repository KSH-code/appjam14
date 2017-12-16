var app, con;
module.exports = (_app, _con) => {
    [app, con] = [_app, _con];
}
exports.getSchoolList = function(req, res){
    const { schoolName } = req.body;
    con.query('select * from `schools` where `name` like ?', [`%${schoolName}%`], (e, rs) => {
        if(!e && rs.length){
            jsonData = {
                schoolList: rs
            }
            res.json(jsonData);
        }else{
            res.status(400);
        }
    });
}