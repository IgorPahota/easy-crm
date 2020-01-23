const express = require('express');
const useMiddleware = require('./middleware');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const leadsRouter = require('./routes/leads');
const contactsRouter = require('./routes/contacts');
const stagesRouter = require('./routes/stages');
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/leads', leadsRouter);
app.use('/contacts', contactsRouter);
app.use('/stages', stagesRouter);

useErrorHandlers(app);

module.exports = app;
