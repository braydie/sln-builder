const MsBuild = require(`msbuild`);

const msbuild = new MsBuild();

module.exports = {
  build: (solution, configuration, clean) => {
    msbuild.getMSBuildPath = () => (process.env.MSBUILD_PATH
      ? process.env.MSBUILD_PATH
      : `C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\MSBuild\\Current\\Bin\\MSBuild.exe`);

    if (!process.env.MSBUILD_PATH) {
      console.log(`----------------------------`);
      console.warn(`* Using default MSBuild path *`);
      console.log(`----------------------------`);
      console.log();
    }

    msbuild.sourcePath = solution;
    msbuild.configuration = configuration;
    msbuild.overrideParams.push(`/p:Platform=Any CPU`);
    if (clean) {
      msbuild.overrideParams.push(`/t:Clean,Build`);
    }
    msbuild.build();
  },
};
