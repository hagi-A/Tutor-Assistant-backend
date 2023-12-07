require('dotenv').config()

const bcrypt = require("bcrypt");

const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose')
const tutorRoutes = require('./routes/tutorRoutes');
const jwt = require("jsonwebtoken");
// const webinarRoutes = require('./routes/webinars')
const user = require('./routes/user')
const chatRoutes = require("./routes/chatRoutes");
// const passwordRoutes = require('./routes/passwordRoute');
const nodemailer = require("nodemailer");
const User = require('./models/userModel')
const userModel = require('./models/userModel');
const tutorModel = require("./models/tutorModel");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const fileRoutes = require("./routes/fileRoutes");
const Tutor = require('./models/tutorModel');
const course = require("./models/course");
const supervisorRouter = require('./routes/supervisorRouter')
const courseRoutes = require("./routes/courseRoutes");
// const io = require("socket.io")({
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });
// express app
const app = express();
const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  // Add more origins as needed
];

const corsOptions = {
  origin: allowedOrigins,
};
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable CORS for all routes
app.use(cors(corsOptions));
// 

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});

// Socket.io
// let users = [];
// io.on('connection', socket => {
//     console.log('User connected', socket.id);
//     socket.on('addUser', userId => {
//         const isUserExist = users.find(user => user.userId === userId);
//         if (!isUserExist) {
//             const user = { userId, socketId: socket.id };
//             users.push(user);
//             io.emit('getUsers', users);
//         }
//     });

//     socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
//         const receiver = users.find(user => user.userId === receiverId);
//         const sender = users.find(user => user.userId === senderId);
//         const user = await User.findById(senderId);
//         console.log('sender :>> ', sender, receiver);
//         if (receiver) {
//             io.to(receiver.socketId)
//               .to(sender.socketId)
//               .emit("getMessage", {
//                 senderId,
//                 message,
//                 conversationId,
//                 receiverId,
//                 user: {
//                   id: user._id,
//                   username: user.username,
//                   email: user.email,
//                 },
//               });
//             }else {
//                 io.to(sender.socketId).emit("getMessage", {
//                   senderId,
//                   message,
//                   conversationId,
//                   receiverId,
//                   user: {
//                     id: user._id,
//                     username: user.username,
//                     email: user.email,
//                   },
//                 });
//             }
//         });

//     socket.on('disconnect', () => {
//         users = users.filter(user => user.socketId !== socket.id);
//         io.emit('getUsers', users);
//     });
//     // io.emit('getUsers', socket.userId);
// });


app.use('/api/user', user)
// app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api/tutor', tutorRoutes); // Use the tutor registration route
// app.use("/api/chat", chatRoutes);
app.use("/api/supervisor", supervisorRouter);
app.get("/getUsers", (req, res) => {
  userModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.get("/getTutors", (req, res) => {
  tutorModel
    .find()
    .then((tutors) => res.json(tutors))
    .catch((err) => res.json(err));
});
app.get("/getAcceptedTutors", (req, res) => {
  tutorModel
    .find({ status: "Accepted" }) // Filter by status "Accepted"
    .sort({ rank: -1 }) // Sort by rank in descending order
    .then((tutors) => res.json(tutors))
    .catch((err) => res.json(err));
});
app.get("/getCourses", (req, res) => {
  course
    .find()
    .then((courses) => res.json(courses))
    .catch((err) => res.json(err));
});
app.get("/getStudents", (req, res) => {
  userModel
    .find({ selectedRole: "Student" }) // Filter by selectedRole
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
// Use the conversation routes
// app.use("/api/conversation", conversationRoutes);
// Use the message routes
app.use("/api/message", messageRoutes);
app.use("/api/files", fileRoutes);
// Use course routes
app.use("/api/course", courseRoutes);
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

app.post("/tutorForgotPassword", (req, res) => {
  const { email } = req.body;
  Tutor.findOne({ email: email }).then((tutor) => {
    if (!tutor) {
      return res.send({ Status: "User not existed" });
    }
    const token = jwt.sign({ id: tutor._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
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
      text: `http://localhost:3000/tutorResetPassword/${tutor._id}/${token}`,
    };
    // console.log(newPassword);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Email could not be sent." });
      } else {
        console.log("Email sent: " + info.response);
        return res.send({ Status: "Success" });
      }
    });
  });
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
app.post("/tutorResetPassword/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          Tutor.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});
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