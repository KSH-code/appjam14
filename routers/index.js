var app;
module.exports = _app => {
    app = _app;
    fs.readdir(`${__dirname}`, (e, fileList) => {
        for(let fileName of fileList){
            if(fileName == 'index.js') continue;
            require(`./${fileName}`)(app);
        }
    });
}