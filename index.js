const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

const orders = require("./routes/orders");
const categories = require("./routes/categories");

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
app.use("/orders", orders);
app.use("/categories", categories);
app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/items"));
app.use("/sellers", require("./routes/sellers"));

// server settings
const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode.`)
);
