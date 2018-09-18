var express = require('express');
var app = express();
var fs = require('fs');
var compression = require('compression');
var bodyParser = require('body-parser');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var helmet = require('helmet');
app.use(helmet());

app.use(express.static('public')); //public폴더 안에서 찾겟다.
app.use(bodyParser.urlencoded({
    extended: false
})); // middle ware
app.use(compression()); // 압축 데이터 용량 확 줄어듬(gZip)
app.get('*', function (request, response, next) { // use->get, get방식으로 들어오는 거만 바꿈
    fs.readdir('./data', function (error, filelist) {
        request.list = filelist;
        next();
    });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter); // /topic으로 시작하는 주소들에게 topicRouter라고 하는 이름의 미들웨어를 적용하겠다.

app.use(function (req, res, next) { // 미들웨어는 순차지향
    res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!');
});

//app.listen(3000, () => console.log('Example app listening on port 3000'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});

/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
      } else {
      }
    } else if(pathname === '/create'){
    } else if(pathname === '/create_process'){
    } else if(pathname === '/update'){
    } else if(pathname === '/update_process'){
    } else if(pathname === '/delete_process'){
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
*/
