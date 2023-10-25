const express = require("express");
const bcrypt = require("bcryptjs");
const path=require("path");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
//connect to mongoose
mongoose
  .connect(
    "mongodb+srv://neel20904:IA542167@cluster0.zs7pkys.mongodb.net/sgp?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err.message));

const userSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  password: String,
  image: {
    type: String,
    default:
      "./public/assets/admin.jpg",
  },
});
//model

const User = mongoose.model("User", userSchema);

//static files

app.use(express.static(__dirname, +"./public"));
// or
// Virtual Path Prefix '/static'
// app.use("/static", express.static("public"));

//view engine setup ejs
app.set("view engine", "ejs");
//app.set("view engine","html");
//pass json data
app.use(express.json());

//pass form data
app.use(express.urlencoded({ extended: true }));
//UO2NMB4IFV43YCDHLGKWD7XCNOZNK6NL
//routes
app.get("/", (req, res) => {
  res.render("indexf");
});
app.get('/about', function(req, res) {
  res.render("about");
});
app.get('/Sportsf', function(req, res) {
  res.render("Sportsf");
});
app.get('/Businessf', function(req, res) {
  res.render("Businessf");
});
app.get('/generalNewsf', function(req, res) {
  res.render("generalNewsf");
});
app.get('/Entertainmentf', function(req, res) {
  res.render("Entertainmentf");
});
app.get('/Technologyf', function(req, res) {
  res.render("Technologyf");
});
app.get('/write', function(req, res) {
  res.render("write");
});
//login form
app.get("/login", (req, res) => {
  res.render("login");
});

//protected form
app.get("/protected", (req, res) => {
  res.render("protected");
});
//login logic
app.post("/login", async (req, res) => {
  //get the username and password
  const { username, password } = req.body;
  //check if user exist
  const userFound = await User.findOne({ username });
  if (!userFound) {
    return res.json({
      msg: "Invalid login credentials",
    });
  }
  //check if password is valid
  const isPasswordvalid = await bcrypt.compare(password, userFound.password);
  if (!isPasswordvalid) {
    return res.json({
      msg: "Invalid password credentials",
    });
  }
  console.log("Login success");
  //API
  // res.json({
  //   msg: "Login Success",
  //   userFound,
  // });
  res.redirect(`/profile/${userFound._id}`);
});

//get  Register form
app.get("/register", (req, res) => {
  res.render("register");
});

//Register user
app.post("/register", async (req, res) => {
  const { fullName, username, password } = req.body;
  //create salt
  const salt = await bcrypt.genSalt(10);
  //hash user password
  const hashedPassword = await bcrypt.hash(password, salt);
  //register user
  await User.create({
    fullName,
    username,
    password: hashedPassword,
  })
    .then((user) => {
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
});

//profile
app.get("/profile/:id", async (req, res) => {
  //find the user by ID
  const user = await User.findById(req.params.id);
  res.render("profile", { user });
});

//listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//63089741fe2ca4e24fd4853c
