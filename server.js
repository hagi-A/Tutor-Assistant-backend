require('dotenv').config()

const bcrypt = require("bcrypt");

const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose')
const tutorRoutes = require('./routes/tutorRoutes');
const jwt = require("jsonwebtoken");
// const webinarRoutes = require('./routes/webinars')
const userRoutes = require('./routes/user')
const chatRoutes = require("./routes/chatRoutes");
const passwordRoutes = require('./routes/passwordRoute');
const nodemailer = require("nodemailer");
const User = require('./models/userModel')

// express app
const app = express()

// middleware
app.use(express.json())
// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:3000' }));


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/user', userRoutes)
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api/tutors', tutorRoutes); // Use the tutor registration route

// app.use('/api/forgotPassword', passwordRoutes); // You can choose your route prefix
app.post('/forgotPassword', (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
      return res.send({Status: "User not existed"})
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        text: `http://localhost:3000/reset-password/${user._id}/${token}`,
      };
      // console.log(newPassword);
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Email could not be sent." });
        } else {
          console.log("Email sent: " + info.response);
          return res.send({Status: "Success"})
        }
      });
  })
});

app.post('/resetPassword/:id/:token', (req, res) => {
  const { id, token } = req.params
  const { password } = req.body
  
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.json({Status: "Error with token"})
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  })
})
app.use("/api/chat", chatRoutes);
// Search endpoint
// app.get('/api/search', (req, res) => {
//   const searchTerm = req.query.q; // Get the search query from the URL query parameter

//   if (!searchTerm) {
//     return res.status(400).json({ error: 'Search query is required.' });
//   }

//   // Fetch data from the database or external data source
//   const data = database.fetchData(); // Replace with the appropriate function to fetch data

//   // Perform a search on the dynamic data
//   const results = data.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   res.json(results);
// });

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 