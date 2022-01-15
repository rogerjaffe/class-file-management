const { getSheet } = require("./getSheet");
const {
  SCOPE,
  PAT_DATA_FIELD_LIST,
  PAT_SHEET_NAME,
  PAT_SPREADSHEET_ID,
  PAT_SHEET_RANGE,
} = require("./constants");

module.exports = async (studentId) => {
  let patList;
  try {
    patList = await getSheet(
      SCOPE,
      PAT_SPREADSHEET_ID,
      PAT_SHEET_NAME,
      PAT_SHEET_RANGE,
      PAT_DATA_FIELD_LIST
    );
  } catch (e) {
    throw e;
  }
  const patData = patList.find((s) => s.studentId === studentId);
  if (!patData) {
    throw new Error("PATNotFoundError");
  } else {
    return patData.pat;
  }
};
