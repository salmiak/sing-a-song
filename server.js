require('rootpath')();
const express = require('express');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

// Keep node dyno on heroku live by pinging it every 5 min
// source: https://quickleft.com/blog/6-easy-ways-to-prevent-your-heroku-node-app-from-sleeping/
const http = require("http");
setInterval(function() {
    http.get("http://singasong-vis.herokuapp.com")
}, 300000); // every 5 minutes (300000)

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/api/users', require('./users/users.controller'));
app.use('/api/profiles', require('./profiles/profiles.controller'));
app.use('/api/media', require('./media/media.controller'));
app.use('/api/sign-s3', require('./s3/s3.controller'));

app.use(history())
process.env.PWD = process.cwd();
const path = process.env.PWD + '/client/dist/';
app.use('/', express.static(path));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
