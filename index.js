const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect db
connectDB();

const app = express();

// body parser
app.use(express.json());

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
// images
app.use("/images", require("./routes/images"));

// server settings
const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode.`)
);
