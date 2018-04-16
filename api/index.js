var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./db');

global.__root   = __dirname + '/';

const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)

app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(getDirectories(`${__dirname}/modules`))

/* ROUTES */
app.use('/auth', require('./modules/auth/routes'));
app.use('/user', require('./modules/user/routes'));
app.use('/articles', require('./modules/articles/routes'));

/* Hello API */
app.get("/", function(req, resp) {
    resp.send("Hello stranger!");
});

module.exports = app;
