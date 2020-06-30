var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')
var express = require('express')

const cors = require('cors');
const config = require('./helpers/config.json');
const jwt = require('./helpers/jwt');
const mongoose = require('mongoose');

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })


require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(jwt());

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());
app.use(csrfProtection);
app.use(parseForm);

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const uri = config.connectionString;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');
const priorityRouter = require('./routes/priority');
const companyRouter = require('./routes/company');
const deviceRouter = require('./routes/device');
const zoneRouter = require('./routes/zone');
const locationRouter = require('./routes/location');


app.use('/api/exercises', exercisesRouter);
app.use('/api/ticket', ticketsRouter);
app.use('/api/user', usersRouter);
app.use('/api/priority', priorityRouter);
app.use('/api/company', companyRouter);
app.use('/api/device', deviceRouter);
app.use('/api/zone', zoneRouter);
app.use('/api/location', locationRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
