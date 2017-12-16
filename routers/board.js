const boardController = require('../controllers/board');
module.exports = app => {
    // 글 작성
    app.post('/write', boardController.write);
}