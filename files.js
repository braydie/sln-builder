const filehound = require(`filehound`);

module.exports = {
  find: () => filehound
    .create()
    .paths(process.cwd())
    .ext(`sln`)
    .find(),
};
