var app, con;
const fs = require('fs');

module.exports = (_app, _con) => {
    [app, con] = [_app, _con];
}

module.exports.generatePdf = (req, res) => {
    let { id } = req.body;
    let text = 'text';
    let dir = __dirname;
    dir = dir.substr(0, dir.length - 12) + '/public/';
    fs.mkdir(`${dir}${id}`, (e) =>{
        fs.writeFile(`${dir}${id}/a.html`, text, 'utf8', (e) => {
            if(e) res.status(400), console.error(e);
            else res.status(200);
        });
    });
}