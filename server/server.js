const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload')

const expressError = require('./utils/ExpressError');
const authRoutes = require('./server_routes/authentication');
const listingRoutes = require('./server_routes/listings');
const commentRoutes = require('./server_routes/comments');
const userRoutes = require('./server_routes/userprofile');

mongoose.connect('mongodb://localhost:27017/Sell_It', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected successfuly');
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//app.use('/api/user', userRoutes);
app.use('/api', listingRoutes);
app.use('/api/listings/:id/comments', commentRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new expressError('Page not found', 404));
});

//ha err az elso akkor, az express egybol error handler middlewarekent kezeli
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) {
    err.message = 'Something went wrong';
  }

  //res.status(status).render('error', {err})
});

app.listen(5000, () => {
  console.log('Sell It Server is running');
});
