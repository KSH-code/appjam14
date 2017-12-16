const loginController = require('../controllers/user');
const schoolController = require('../controllers/school');
const generatePdf = require('../controllers/generatePdf');
module.exports = app => {
    // 회원가입
    app.post('/register', loginController.register);
    // 로그인
    app.post('/login', loginController.login);
    // 학교 리스트
    app.get('/schoolList', schoolController.getSchoolList);
    // pdf 저장
    app.post('/pdf', generatePdf.generatePdf);
    // user 채택 당한거 개수
    app.post('/chkedList', loginController.getCheckdList);
}