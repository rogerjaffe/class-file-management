/**
 * Node process to configure computer for student work
 *
 * Workflow:
 *   Input: student email
 *   Prompt for password
 *   Send https request to authenticate and retrieve name and Github PAT
 *   Create ~/.netrc file on student computer with auth string generated in
 *     createNetrcString function
 *   Execute git config --global user.email "<email>"
 *   Execute git config --global user.name "<name>"
 */
const { getPassword } = require("./getPassword");
const { createNetrcString } = require("./createNetrcString");
const fetch = require("node-fetch");
const fs = require("fs");
const os = require("os");

const NETRC_FILE = ".netrc";
const URL =
  "https://us-central1-class-file-management.cloudfunctions.net/getStudentData";

const runGitConfig = async (email, lastName, firstName) => {
  const { exec } = require("child_process");
  const setEmail = `git config --global user.email "${email}"`;
  const setName = `git config --global user.name "${firstName} ${lastName}"`;
  const command = setEmail + "; " + setName;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      throw new Error("err.message");
    }
    return;
  });
};

const processData = async (data) => {
  try {
    const filename = os.homedir() + "/" + NETRC_FILE;
    fs.writeFileSync(filename, createNetrcString(data.email, data.pat), {
      encoding: "UTF8",
    });
    await runGitConfig(data.email, data.lastName, data.firstName);
  } catch (e) {
    throw new Error("ProcessDataError");
  }
};

const query = (studentId) => (password) => {
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, password }),
  })
    .then((res) => res.json())
    .then(async (data) => {
      await processData(data);
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const studentId = process.argv[2];
let password = process.argv[3];
if (!studentId) {
  console.log("ERROR: Missing student ID.  Use node cfm <studentID>");
  process.exit(1);
}

if (password) {
  // If password is provided in command line process directly
  query(studentId)(password);
} else {
  // Prompt for password and return in callback then process
  getPassword(query(studentId));
}
