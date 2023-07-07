const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_CONFIG } = process.env;

const connectMongoose = async () => {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  try {
    // console.log("DB ==>", DB_CONFIG);
    await mongoose.connect(DB_CONFIG, options);
    console.log("mongoose.js: " + "Successfully connected to mongo database!!");
  } catch (ex) {
    console.log("Error on mongoose connection", ex.message);
    console.log(ex);
  }
};

module.exports = { connectMongoose };

