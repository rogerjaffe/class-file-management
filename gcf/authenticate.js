const { getSheet } = require("./getSheet");
const {
  SCOPE,
  STUDENT_DATA_FIELD_LIST,
  STUDENT_SHEET_NAME,
  STUDENT_SPREADSHEET_ID,
  STUDENT_SHEET_RANGE,
} = require("./constants");

module.exports = async (studentId, password) => {
  if (!studentId) throw new Error("MissingStudentIdError");
  if (!password) throw new Error("MissingPasswordError");
  let studentData;
  try {
    studentData = await getSheet(
      SCOPE,
      STUDENT_SPREADSHEET_ID,
      STUDENT_SHEET_NAME,
      STUDENT_SHEET_RANGE,
      STUDENT_DATA_FIELD_LIST
    );
  } catch (e) {
    throw e;
  }
  const student = studentData.find(
    (s) => s.studentId === studentId && s.password === password
  );
  if (!student) {
    throw new Error("AuthenticationFailed");
  } else {
    return student;
  }
};
