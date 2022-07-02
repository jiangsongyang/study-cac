const cli = require("cac")();

cli
  // Simply omit the command name, just brackets
  .command("[...files]", "Build files")
  .option("--minimize", "Minimize output")
  .action((files, options) => {
    console.log(files);
    console.log(options.minimize);
  });

cli.parse();
