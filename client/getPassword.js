const stdout = process.stdout;
const stdin = process.stdin;

exports.getPassword = (callback) => {
  function cleanup() {
    stdin.removeListener("data", pn);
    stdin.setRawMode(false);
    stdout.write("\n");
    stdin.pause();
  }

  function enter() {
    cleanup();
    callback(input);
  }

  function newchar(c) {
    input += c;
  }

  function backspace() {
    input = input.slice(0, input.length - 1);
  }

  const pn = (data) => {
    const c = data;
    switch (c) {
      case "\u0004": // Ctrl-d
      case "\r":
      case "\n":
        return enter();
      case "\u0003": // Ctrl-c
        return cleanup();
      default:
        // backspace
        if (c.charCodeAt(0) === 8) return backspace();
        else return newchar(c);
    }
  };

  stdout.write("Password: ");
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf-8");
  let input = "";
  stdin.on("data", pn);
};
