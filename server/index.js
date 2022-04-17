require("dotenv").config();
// requiring node modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

// initializing express
const app = express();
// constant variables. DO NOT CHANGE
const PORT = process.env.PORT;

// paths
const handle = require("./handlers");
const db = require("./models"); // models path
const routes = require("./routes");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/api/auth", routes.auth);
app.use("/api/poll", routes.poll);

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});
// deployement
// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.json({ hello: "world" });
//   });
// }

app.use(handle.notFound);
app.use(handle.errorHandler);

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then((res) => {
    console.log("Server is connected and is running on PORT 3000");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
