const boardController = require('../controllers/board');
const userController = require('../controllers/user');
module.exports = app => {
    // 글 작성
    app.post('/write', userController.isLogin, boardController.write);
    // 글 목록
    app.get('/', boardController.loadList);
    // 댓글 불러오기
    app.get('/board/:idx', boardController.loadComments);
    // 댓글 작성
    app.post('/board/:idx', userController.isLogin, boardController.writeComment);
    // 댓글 채택
    app.post('/write/:idx/:commentIdx', userController.isLogin, boardController.checkComment);
}