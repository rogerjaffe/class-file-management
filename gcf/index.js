const authenticate = require("./authenticate");
const getPat = require("./getPat");

/**
 * Google cloud function to validate student ID / password and return the
 * Github Personal Access Token, name, and email for file management on a
 * shared classroom computer
 *
 * Workflow:
 *   Input parameters:
 *     student ID
 *     password
 *
 *   Retrieve student sheet data
 *   Find student ID
 *   If not valid password return error
 *   Retrieve PAT sheet data
 *   Find student ID
 *   Return name, email, PAT to client
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getStudentData = async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const student = await authenticate(studentId, password);
    const pat = await getPat(student.studentId);
    res.status(200).send({
      error: false,
      pat,
      email: student.email,
      lastName: student.lastName,
      firstName: student.firstName,
    });
  } catch (e) {
    res.status(200).send({ error: true, message: e.message });
  }
};
