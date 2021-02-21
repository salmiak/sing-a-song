require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

const path = __dirname + '/client/dist/';

const app = express();

app.use(express.static(path));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/profiles', require('./profiles/profiles.controller'));
app.use('/media', require('./media/media.controller'));

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
