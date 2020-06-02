const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost/ticketing";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const ticketsRouter = require('./routes/tickets');
const priorityRouter = require('./routes/priority');


app.use('/exercises', exercisesRouter);
app.use('/tickets', ticketsRouter);
app.use('/users', usersRouter);
app.use('/priority', priorityRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
