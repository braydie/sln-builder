const Nuget = require(`nuget-runner`);

module.exports = Nuget({
  nugetPath: `${__dirname}./nuget.exe`,
});
