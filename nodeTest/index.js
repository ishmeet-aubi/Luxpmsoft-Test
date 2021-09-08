const express = require("express");
const passport = require("passport");
const path = require("path");
const Passport = require("./config/passport");
const cors = require("cors");
const app = express();

const { spawn } = require("child_process"); //for python file

const corsOptions = {
  origin: "http://localhost/3000",
};
app.use(cors(corsOptions));

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

const db = "models";
db.sequelize.sync({ force: true }).then(() => {
  console.log(" RE-SYNC DATABASE");
});

// Initializing a simple route for testing purposes

app.get("/", function (req, res) {
  var DataSet = [];

  const python = spawn("python", ["countries.py"]);
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    DataSet.push(data);
  });

  python.on("close", (code) => {
    console.log(`child process close  ${code}`);

    res.send(DataSet.join(""));
  });
});

//starts the normal test app
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(__dirname + "/logo"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var passports = Passport();

require("routes/routes.js")(app);

const PORT = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("App is listening to port : " + `${PORT}`);
});
