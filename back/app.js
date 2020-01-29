const express = require('express');
const useMiddleware = require('./middleware');
const usersRouter = require('./routes/users');
const leadsRouter = require('./routes/leads');
const contactsRouter = require('./routes/contacts');
const stagesRouter = require('./routes/stages');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const notesRouter = require('./routes/notes');
const indexRouter = require('./routes/index');
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/users', usersRouter);
app.use('/leads', leadsRouter);
app.use('/notes', notesRouter);
app.use('/contacts', contactsRouter);
app.use('/stages', stagesRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/', indexRouter);

useErrorHandlers(app);

module.exports = app;
