const loginController = require('../controllers/user');
const schoolController = require('../controllers/school');
module.exports = app => {
    // 회원가입
    app.post('/register', loginController.register);
    // 로그인
    app.post('/login', loginController.login);
    // 학교 리스트
    app.get('/schoolList', schoolController.getSchoolList);
}