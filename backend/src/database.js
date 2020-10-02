const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database conectada");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error");
    process.exit(1);
  }
};
module.exports = conectarDB;
