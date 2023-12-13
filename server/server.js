const mongoose = require("mongoose");
const express = require("express");
const app = express();
const logInRouter = require("./routers/logInRouter");
const signUpRouter = require("./routers/signUpRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const logOutRouter = require("./routers/logOutRouter");
const cookieParser = require('cookie-parser');
const path = require("path");

const SIGN_UP_URL = "/signUp";
const LOG_IN_URL = "/logIn";
const USER_URL = "/user"
const POST_URL = "/post";
const LOG_OUT_URL = "/logOut";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(LOG_IN_URL, logInRouter);
app.use(SIGN_UP_URL, signUpRouter);
app.use(USER_URL, userRouter);
app.use(POST_URL, postRouter);
app.use(LOG_OUT_URL, logOutRouter);

let frontend_dir = path.join(__dirname, '..', 'client', 'build')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
  console.log("received request");
  res.sendFile(path.join(frontend_dir, "index.html"));
});

const mongoUri = "mongodb+srv://cs5610:cs5610@cluster0.gj3ykat.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(mongoUri, {
  autoIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.listen( 8000, function() {
  console.log("Starting server now...")
})
