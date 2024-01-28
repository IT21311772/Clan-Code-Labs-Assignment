// Importing express, cors, mongoose and body-parser
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Use of middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// Import the user routes
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const todoRouter = require('./routes/todoRoutes');

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/todo', todoRouter);

// Connect to the database
mongoose
    .connect("mongodb+srv://rishenlithan2001:rishen2001@assignment.pg020sq.mongodb.net/")
    .catch((err) => console.log(err));

app.listen(3001, function() {
    console.log('Server is running');
});