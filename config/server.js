/* Import modulo framework express e demais modulos */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

/* Inicia o obj express */
var app = express();

/* Configurar EJS como engine de Views */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* Configurar o middleware express.static */
app.use(express.static('./app/public'));

/* Configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* Configurar middleware express-validator */
app.use(expressValidator());

/* Efetua autoload dar rotas, models e controllers para o obj app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

/* exporta obj app */
module.exports = app;