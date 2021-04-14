const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { setUser } = require('./middleware/setUser');
require('dotenv/config');

server.use(express.json());
server.use(cors());
server.use(helmet()); //middleware used for security in the request header
server.use(setUser);

//import routes here
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listings');
const reviewRoutes = require('./routes/reviews');
const resRoutes = require('./routes/reservations');

server.use('/api/auth', authRoutes);
server.use('/api/listings', listingRoutes);
server.use('/api/reviews', reviewRoutes);
server.use('/api/reservations', resRoutes);

server.get('/', (req, res) => {
  res.send('This is the home route');
});

//DB Connection
try {
  mongoose.connect(
    process.env.DB_CONN,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to database...')
  );
} catch (err) {
  console.log(err);
}

//start listening on server
server.listen(3030, () => console.log('Server up and running...'));
