const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const conversationRoute = require("./routes/conversations")
const cors = require('cors');
const messageRoute = require("./routes/messages")
const path = require("path");


dotenv.config();


mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log("connect mongo");
  }
)

app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pictures");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


app.use("/api/auth", authRoute)
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.post("/upload-file", async (req, res) => {
  try {
      if (!req.files) {
          res.send({
              status: "failed",
              message: "No file uploaded",
          });
      } else {
          let file = req.files.file;

          file.mv("./uploads/" + file.name);

          res.send({
              status: "success",
              message: "File is uploaded",
              data: {
                  name: file.name,
                  mimetype: file.mimetype,
                  size: file.size,
              },
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

// ---------deployment---------
// const __dirname1 = path.resolve()
// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));
  
//   app.get("/*", (req, res) =>{
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//   })
// } else {
//   app.get("/", (req, res) =>{
//     res.send("api is running succesfully")
//   })
// }
// ---------deployment---------
const PORT = process.env.PORT || 8800;

const server = app.listen(PORT, () => {
  console.log("connect backend")
});

// Socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some(user=>user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId) => {
  users = users.filter(user=>user.socketId !== socketId);
}

const getUser = (userId) => {
  return users.find(user => user.userId === userId);
}


io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("addUser", userId=>{
    addUser(userId, socket.id);
    io.emit("getUsers", users)
  });

  //send and get message
  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage",{
      senderId, 
      text,
    });

  });

  //when disconnect
  socket.on("disconnect", () => {
       console.log("a user disconnected");
       removeUser(socket.id);
       io.emit("getUsers", users)
  })
});