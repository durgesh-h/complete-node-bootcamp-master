const { error } = require('console');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const port = 3000;
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 1)MIDDLEWARES

app.use(express.json());

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});
app.use(morgan('dev'));
// 2) ROUTES HANDLER

const getAllTour = (req, res) => {
  console.log(req.requestedTime);
  res.status(200).json({
    status: 'Success',
    requestedTime: req.requestedTime,
    results: tours.length,
    data: { tours },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id == id);
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({ status: 'Success', data: { tour } });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id == id);
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({ status: 'Success', data: { tour } });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id == id);
  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  res.status(204).json({ status: 'Success', data: null });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
};
// 3) ROUTES

// app.get('/api/v1/tours', getAllTour);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTour).post(createTour);
app.use((req, res, next) => {
  console.log('Hello from the middleware!👋');
  next();
});

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
