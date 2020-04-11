/*
  Database connection
*/
const mongoose = require("mongoose");

// db connection
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    // remove warnings from console
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`DB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
