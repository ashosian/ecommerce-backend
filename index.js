const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const fileUpload = require('express-fileupload');

// const data = [{ id: 1, msg: 'hello' }, { id: 2, msg: 'sello' }];


// const isExist = data.find((d) => d.id === 4);
// if (isExist) {
//   console.log('hello');
// }


// const ratings = [{ id: 1, rate: 5 }, { id: 2, rate: 4 }, { id: 3, rate: 3 }];

// const total = ratings.reduce((a, b) => a + b.rate, 0);
// console.log(total / ratings.length);



// mongoose.set('strictQuery', false);

// let d = {
//   title: 'hello'
// };

// const data = {

// };

// d.title = data.title || d.title;
// console.log(d);
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://ashokrai13254:ashokrai@cluster0.sc3erxw.mongodb.net/Sample3').then((result) => {
  app.listen(5000, () => {
    console.log('Server started!');
  });
}).catch((err) => {
  console.log(err);
})

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  createParentPath: true
}));

app.use('/uploads', express.static('uploads'))

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.use((req, res) => {
  return res.status(404).json({
    message: 'not found'
  });
});