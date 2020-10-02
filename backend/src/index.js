const express = require("express");
const morgan = require("morgan");
const conectarDB = require("./database");
const cors = require("cors");
require("dotenv").config();
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
conectarDB();
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");
});

const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
http.listen(port, process.env.ip, function () {
  console.log("Server is running!");
});
