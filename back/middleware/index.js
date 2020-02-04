module.exports = function (app) {
  const express = require('express');
  const morgan = require('morgan');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const path = require('path');
  const FileStore = require('session-file-store')(session);
  const { cookiesCleaner } = require('./auth');
  const dbConnection = require('./db-connect');

  app.use(morgan('dev'));

  // Body POST запросов.
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // initialize cookie-parser to allow us access the cookies stored in the browser.
  app.use(cookieParser());

  // initialize express-session to allow us track the logged-in user across sessions.
  app.use(
    session({
      store: new FileStore(),
      key: 'user_sid',
      secret: 'anything here',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000000000
      }
    })
  );

  app.use(cookiesCleaner);

  // Подключаем статику local
  // app.use(express.static(path.join(__dirname, '..', 'public')));
};
