const mongoose = require("mongoose");
function DbConnect() {
  const DB_URL = "mongodb+srv://task:task@cluster0.v0lcop8.mongodb.net/?retryWrites=true&w=majority";
  mongoose.set('strictQuery', true)
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error❌❌"));
  db.once("open", () => {
    console.log("Database connected✅");
  });
}

module.exports = DbConnect;