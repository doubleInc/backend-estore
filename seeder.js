/*
    Seeder for importing and deleting data from the DB

    Usage sample;

    In the command line, to populate the DB type "node seeder.js -seed path/to/datafile.json"
    To remove from the DB type "node seeder.js -del"

*/
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load env variables using path to config
dotenv.config({ path: "./config/config.env" });

//Load models
const Category = require("./models/Category");

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  // remove warnings from console
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Seed data to db
const seedData = async (filePath) => {
  //Read in JSON file contents from _data folder
  const jsonData = JSON.parse(fs.readFileSync(`${filePath}`, "utf-8"));

  await Category.create(jsonData);

  console.log("Seeding DATA ...");
  process.exit();
};

// Seed data to db
const deleteData = async (filePath) => {
  await Category.deleteMany();

  console.log("Deleting DATA ...");
  process.exit();
};

// run file
if (process.argv[2] === "-seed") {
  // argument [3] is path to JSON file
  seedData(process.argv[3]);
} else if (process.argv[2] === "-del") {
  deleteData(process.argv[3]);
}
