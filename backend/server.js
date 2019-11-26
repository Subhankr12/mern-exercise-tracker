const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(() => console.log("error"));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/h", (req, res) => res.send("Hello"));
app.get("/", (req, res) => res.send("Hello"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
