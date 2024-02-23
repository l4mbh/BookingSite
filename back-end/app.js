const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Routers
const hotelRoutes = require('./routers/hotel');
const userRoutes = require('./routers/user');
const adminRoutes = require('./routers/admin');

const app = express();

app.use(cors({
  origin: ["https://booking-site-server-psi.vercel.app"],
  methods: ["GET,OPTIONS,PATCH,DELETE,POST,PUT"],
  credentials: true
}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


// Use routes
app.use('/hotel', hotelRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.use("/", (req, res, next) => {
  res.send("Hello")
})
mongoose.connect('mongodb+srv://lambh1998:25076301a@cluster0.kyjcau4.mongodb.net/booking')
  .then(result => {
    app.listen(5000, () => {console.log("Mongoose connected !!! App running on port 5000!")})
  })
