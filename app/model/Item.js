const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const schema = mongoose.Schema;
// const model = mongoose.model;

const ItemSchema = new Schema({
  name: { type: String },
  gender: { type: String },
  student_num: { type: Number },
  class: { type: String },
  parent: { type: Array },
  status: { type: String },
  status_num: { type: Number },
  remarks: { type: String },
  imgUrl: { type: String },
  studentClass: { type: String },
  studentGrade: { type: String },
  studentStatus: { type: String },
  //   studentName: { type: String }, //学生姓名
  //   studentGender: { type: String }, //学生性别
  //   queryStudentClass: { type: String }, //学生班级
  //   studentNum: { type: String }, //学号
  //   queryStudentStatus: { type: String }, //学籍状态
});

const Item = model("Item", ItemSchema);

module.exports = Item;
