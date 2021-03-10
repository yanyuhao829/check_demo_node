const express = require("express");
const router = express.Router();
const User = require("../model/User");
const md5 = require("md5-node");
const SECRET = "miyaojwttoken";
const jwt = require("jsonwebtoken");
//用户列表
router.get("/", async (req, res) => {
  const list = await User.find();
  res.send(list);
});
//注册
router.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(220).send({ msg: "该用户已存在" });
  }
  const newUser = await new User(req.body).save();
  res.send(newUser);
});
//删除
router.post("/del_user_list", async (req, res) => {
  try {
    let whereStr = { _id: req.body._id };
    const delStu = await User.findOne(whereStr);
    await delStu.remove();
    res.send({ msg: "删除成功" });
  } catch {
    res.status(220).send({ msg: "参数错误" });
  }
});
//登录
router.post("/login", async (req, res) => {
  //1.检查用户是否存在
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(220).send({ msg: "该用户不存在" });
    }
    //2.用户存在，判断密码
    if (md5(req.body.password) !== user.password) {
      return res.status(220).send({ msg: "密码错误" });
    } else {
      const token = jwt.sign(
        {
          id: String(user._id),
        },
        SECRET
      );
      res.send({
        isAdmin: user.isAdmin,
        msg: "登陆成功",
        token,
      });
    }
  } catch (error) {
    res.send("error");
  }
});
// //中间件
// const auth = async (req, res, next) => {
//   const raw = String(req.headers.authorization).split(" ").pop();
//   const { id } = jwt.verify(raw, SECRET);
//   req.user = await User.findById(id);
//   next();
// };

module.exports = router;
