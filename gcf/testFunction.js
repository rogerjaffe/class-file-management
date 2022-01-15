const { getStudentData } = require("./index");
const { getSheet } = require("./getSheet");
// const {
//   SCOPE,
//   STUDENT_SPREADSHEET_ID,
//   STUDENT_SHEET_NAME,
//   RANGE,
//   STUDENT_DATA_FIELD_LIST,
// } = require("./constants");

const fcn = async () => {
  const req = {
    body: {
      studentId: "000000",
      password: "password",
    },
  };

  const res = {
    status: (code) => {
      console.log(code);
      return res;
    },
    send: (msg) => console.log(JSON.stringify(msg)),
  };

  getStudentData(req, res);
};

fcn();
