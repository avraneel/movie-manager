const express = require("express");
const router = require("./router");
const app = express();

const port = 3000;

app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server listening on port ${port}`);
});
