const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongo = require("./config/db.js");
const routes = require("./router");

const app = new express();

mongo(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//  开启 CORS 跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization,token, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

  if (req.method == "OPTIONS") {
    res.send(200); //让options请求快速返回
  } else {
    next();
  }
});
routes(app);

app.listen(5000, () => {
  console.log("server listen at 5000");
});
