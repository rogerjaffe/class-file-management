exports.createNetrcString = (email, pat) =>
  `machine github.com login ${email} password ${pat}`;
