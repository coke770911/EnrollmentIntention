var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');

//設定
var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 設定 i18n
i18n.configure({
  locales: ['en'], // 支援的語言列表
  defaultLocale: 'en',    // 默認語言
  directory: __dirname + '/locales', // 存放語言文件的目錄
  cookie: 'lang',         // 設置用於存儲語言信息的 cookie 名稱
  debug: true
});
app.use(i18n.init);
//設定到全域
app.locals.i18n = i18n.__;

// 設定路由
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
