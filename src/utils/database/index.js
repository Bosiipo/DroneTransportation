const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_CONFIG } = process.env;

module.exports = async () => {
  const options = {
    useNewUrlParser: true,
  };
  try {
    console.log({DB_CONFIG});
    await mongoose.connect(DB_CONFIG, options);

    console.log("Successfully connected to mongo database!");
  } catch (ex) {
    console.log(JSON.stringify(ex), "GONER");
    process.exit(1);
  }
};
