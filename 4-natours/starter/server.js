const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Errors Outside Express: Uncaught Rejections
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTIONS! 💥 SHUTTING DOWN...!');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log(process.env.NODE_ENV);
});
// Errors Outside Express: Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTIONS! 💥 SHUTTING DOWN...!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
