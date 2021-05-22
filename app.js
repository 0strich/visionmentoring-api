var createError = require("http-errors");
var express = require("express");
var path = require("path");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const {
  testingDatabase,
  batchImport,
  addEvent,
  getAllEvents,
  getMonthEvents,
  getDayEvents,
  removeEvent,
  editEvent,
  getWeekEvents,
} = require("./handlers");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.json())

  .get("/testDB", testingDatabase)
  .get("/import", batchImport)

  //.get("/allEvents", getEvents)
  .get("/events/month/:month", getMonthEvents)
  .post("/newEvent", addEvent)
  .get("/events/date/:date", getDayEvents)
  .delete("/event", removeEvent)
  .put("/editEvent", editEvent)
  .post("/events/week", getWeekEvents)

  /***********************************************
   ***********************************************/
  .get("*", (req, res) =>
    res.status(404).json({
      status: 404,
      message: "There is a problem with your request!",
    })
  );

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
