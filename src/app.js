const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const path = require('path');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}))

//middlewares

app.use(morgan('dev'));
//allowed accept html form with only format json
app.use(express.urlencoded({extended : false}));


//routes
app.use(require ('./routes/index.js'));

//static files allow say express where is the public folder
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;