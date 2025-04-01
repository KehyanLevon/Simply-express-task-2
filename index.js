require('dotenv').config();
const trackRouter = require('./routing/track-rout');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const { PORT, SESSION_SECRET, NODE_ENV } = process.env;

app.use(cookieParser());
app.use(session({
    secret: SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: NODE_ENV === 'production' }
}));

app.use('/track', trackRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});