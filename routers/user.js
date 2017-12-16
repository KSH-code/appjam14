const loginController = require('../controllers/user');
const schoolController = require('../controllers/school');
module.exports = app => {
    // 회원가입
    app.route('/register').post(loginController.register);
    // 로그인
    app.route('/login').post(loginController.login);
    // 학교 리스트
    app.route('/schoolList').get(schoolController.getSchoolList);
}