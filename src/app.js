const express = require('express');
const { engine } = require('express-handlebars');
const { resolve, join } = require('path');
const session = require('express-session');

const app = express();

app.use( express.static(join(process.cwd(), 'public')))
// console.log(join(process.cwd(), 'public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: "fda$#@#@$#",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000, // 1 dia
  },
}))

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', resolve(process.cwd(), 'src', 'views'));
app.use(require('./routes'))

module.exports = { app }