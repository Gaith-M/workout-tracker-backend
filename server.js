const app = require("./app");
const PORT = process.env.PORT || 4321;
const mongoose = require("mongoose");
const connectDB = require("./config/db-connection");

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to database.");
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
