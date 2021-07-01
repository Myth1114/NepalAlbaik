const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const admin = require("firebase-admin");

const mongoSanitize = require("express-mongo-sanitize");
const errorController = require("./controllers/errorController");
const ProductsRouter = require("./Routers/productsRouter");
const csrf = require("csurf");
const usersRouter = require("./Routers/usersRouter");
const serviceAccount = require("./serviceAccountKey.json");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");
var filter = require("content-filter");
const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// const csrfMiddleware = csrf({ cookie: true });
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
// const csrfMiddleWare = csrf({ cookie: true });
app.use(cors({ credentials: true, origin: true }));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(xss());

app.use(express.json());
app.use(mongoSanitize());
app.disable("x-powered-by");
var blackList = ["$", "{", "&&", "||"];

var options = {
  urlBlackList: blackList,
  bodyBlackList: blackList,
};

app.use(filter(options));

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this IP",
});

app.use("/api", limiter);

app.use("/api/v1/products", ProductsRouter);
app.use("/api/v1/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");

    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
  });
}
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Client", "build", "service-worker.js"));
});
module.exports = app;
