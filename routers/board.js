const boardController = require('../controllers/board');
const userController = require('../controllers/user');
module.exports = app => {
    // 글 작성
    app.post('/write', userController.isLogin, boardController.write);
    // 글 목록
    app.get('/', boardController.loadList);
    // 댓글 작성
    app.post('/write/:idx', userController.isLogin, boardController.commentWrite);
}