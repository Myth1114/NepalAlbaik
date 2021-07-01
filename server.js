const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./App");

process.on("uncaughtException", (err) => {
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((con) => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error, "could not connect");
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("running on port", port);
  console.log(process.env.NODE_ENV,"this is the node env")
});

process.on("SIGTERM", () => {
  server.close();
});
