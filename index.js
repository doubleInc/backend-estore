const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Cloudinary
const bodyParser = require('body-parser');
const path = require('path');
var cloudiRouter = require('./routes/sellers');

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect db
connectDB();

const app = express();

// body parser
app.use(express.json());

// HERE WE WILL LET OUR APP TO GET ACCESS TO THE STATIC FOLDERS LIKE CSS, IMAGES.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));

// HANDLING CORS ERRORS
app.use((req, res, next) =>{
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', '*');
if(req.method === 'OPTIONS'){
res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
return res.status(200).json({})
}
 next();
});

// Dev logging middleware
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

//mount routes
app.use("/orders", require("./routes/orders"));
app.use("/categories", require("./routes/categories"));
app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/items"));
app.use("/sellers", require("./routes/sellers"));
// signup users
app.use("/login", require("./routes/authorize"));

// server settings
const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode.`)
);
