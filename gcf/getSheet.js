const { google } = require("googleapis");

/**
 * Gets data from a Google spreadsheet.
 *
 * @param scope             https://www.googleapis.com/auth/spreadsheets
 * @param spreadsheetId
 * @param sheetName
 * @param range             In A1:G10, A:D, etc format
 * @param fieldList         Field titles for each sheet column
 * @returns {Promise<*[]>}
 */
exports.getSheet = async (
  scope,
  spreadsheetId,
  sheetName,
  range,
  fieldList
) => {
  try {
    const auth = await google.auth.getClient({
      scopes: [scope],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${range}`,
    });
    return response.data.values.map((s) => {
      return fieldList.reduce((acc, field, idx) => {
        acc[field] = s[idx];
        return acc;
      }, {});
    });
  } catch (err) {
    throw err;
  }
};
