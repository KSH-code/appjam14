var app, con;
const fs = require('fs');
var htmlToPdf = require('html-to-pdf');

module.exports = (_app, _con) => {
    [app, con] = [_app, _con];
}

module.exports.generatePdf = (req, res) => {
    let { id } = "sori";
    let startHtml = '<html>text';
    let endHtml = "tttt</html>";
    let dir = __dirname;
    dir = dir.substr(0, dir.length - 12) + '/public/';
    fs.mkdir(`${dir}${id}`, (e) =>{
        fs.unlinkSync(`${dir}${id}/temp.html`);
        fs.writeFile(`${dir}${id}/temp.html`, startHtml+id+endHtml, 'utf8', (e) => {
            if(e) res.status(400).end(), console.error(e);
            else {
                htmlToPdf.convertHTMLFile(`${dir}${id}/temp.html`, `${dir}${id}/auth.pdf`,
                function (error, success) {
                    if (error) {
                        console.log('Oh noes! Errorz!');
                        console.log(error);
                        res.status(400).end();
                    } else {
                        setInterval(function(){
                            fs.unlinkSync(`${dir}${id}/temp.html`);
                        }, 1000 * 60 * 5);
                        console.log('Woot! Success!');
                        console.log(success);
                        res.status(200).end();
                    }
                });
            }
        });
    });

}



