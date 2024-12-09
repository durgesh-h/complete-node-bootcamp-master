const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1)MIDDLEWARES

app.use(express.json());

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});
app.use(morgan('dev'));
//Serving static file
app.use(express.static(`${__dirname}/public`));
// 3) ROUTES

// app.get('/api/v1/tours', getAllTour);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
