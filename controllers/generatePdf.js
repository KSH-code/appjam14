var app, con;
const fs = require('fs');
var htmlToPdf = require('html-to-pdf');

module.exports = (_app, _con) => {
    [app, con] = [_app, _con];
}

module.exports.generatePdf = (req, res) => {
    let { name, schoolName, id } = req.body;
    let startHtml = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Talk학 인증서</title>
    <style>
        *{
            margin: 0; padding: 0; 
            font-family: "궁서";
            font-weight: bold;
        }
        .wrap{
            position: relative;
            width: 488px;
            height: 750px;
            background:url('http://file.rinc.kr/background.jpg') no-repeat left top;
            padding: 50px;
        }
        .wrap h1{
            text-align: center;
            font-size: 35px;
        }
        .wrap .name{ text-align: right; margin-top: 70px; font-size: 25px;}
        .text{
            margin-top: 60px;
            font-size: 25px;
            line-height: 1.5;
            letter-spacing: 2px;
        }
        .foot{
            position: absolute;
            bottom: 100px;
        }
        .foot span{
            line-height: 1.5;
            letter-spacing: 1.2px;
            font-size: 25px;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <h1>Talk학 인증서</h1>
        <p class="name">${name}</p>
        <p class="text">
            ${schoolName} 재학, 출신 ${name}님께서는 Talk학에서 1학기(6개월)동안
            훌륭한 답변율을 지원해주셨으며 많은 중, 고등학생에게 많은 배움을 공유해주셨기에
            이 인증서를 수여합니다.
        </p>
        <p class="foot">
            <span>
                ${new Date().toISOString().split("T")[0]} ${name}님꼐 인증서를 수여합니다.
            </span>    
        </p>
    </div>
</body>
</html>
`;
    let dir = __dirname;
    dir = dir.substr(0, dir.length - 12) + '/public/';
    fs.mkdir(`${dir}${id}`, (e) => {
        if(fs.existsSync(`${dir}${id}/temp.html`)) fs.unlinkSync(`${dir}${id}/temp.html`);        
        htmlToPdf.setDebug(true);
        htmlToPdf.setInputEncoding("utf-8");
        htmlToPdf.setOutputEncoding("utf-8");
        htmlToPdf.convertHTMLString(startHtml.toString(), `${dir}${id}/auth.pdf`,
        function (error, success) {
            if (error) {
                res.status(400).end();
            } else {
                res.status(200).end();
            }
        });
    });

}



