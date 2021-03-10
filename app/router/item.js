const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Item = require("../model/Item");

// 新增
router.post("/add_student_list", async (req, res) => {
  try {
    const data = req.body;
    await Item.create(data);
    res.send({ msg: "新增成功" });
  } catch {
    res.status(220).send({ msg: "error" });
  }
});
// 列表
router.get("/student_list", async (req, res) => {
  try {
    let page = +req.query.page;
    let per_page = +req.query.per_page;
    let count = await Item.find();
    const data = await Item.find()
      .skip((page - 1) * per_page)
      .limit(per_page);
    res.send({count:count.length,list:data});
  } catch {
    res.status(220).send({ msg: "error" });
  }
});
// 删除
router.post("/del_student_list", async (req, res) => {
  try {
    let whereStr = { _id: req.body._id };
    const delStu = await Item.findOne(whereStr);
    await delStu.remove();
    res.send({ msg: "删除成功" });
  } catch {
    res.status(220).send({ msg: "参数错误" });
  }
});
// 编辑
router.post("/edit_student_list", async (req, res) => {
  try {
    let whereStr = { _id: req.body._id };
    const newData = await Item.findOne(whereStr);
    newData.name = req.body.name;
    newData.gender = req.body.gender;
    newData.imgUrl = req.body.imgUrl;
    newData.parent = req.body.parent;
    newData.remarks = req.body.remarks;
    newData.status = req.body.status;
    newData.status_num = req.body.status_num;
    newData.studentClass = req.body.studentClass;
    newData.studentGrade = req.body.studentGrade;
    newData.studentStatus = req.body.studentStatus;
    newData.student_num = req.body.student_num;
    await newData.save();
    res.send({ msg: "编辑成功" });
  } catch {
    res.status(220).send({ msg: "error" });
  }
});
// 查询
router.post("/search_student_list", async (req, res) => {
  try {
    // let whereStr = {
    //   name: req.body.name,
    //   gender: req.body.gender,
    //   studentStatus: req.body.studentStatus,
    //   studentClass: req.body.studentClass,
    //   student_num: req.body.student_num,
    // };
    let data = await Item.find(
      //   $or: [
      {
        name: req.body.name,
        gender: req.body.gender,
        studentStatus: req.body.studentStatus,
        studentClass: req.body.studentClass,
        student_num: req.body.student_num,
      }
      //   ],
    );
    res.send(data);
  } catch {
    res.status(220).send({ msg: "error" });
  }
});
module.exports = router;
