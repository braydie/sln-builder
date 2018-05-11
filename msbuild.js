const _msbuild = require('msbuild');

const msbuild = new _msbuild();

module.exports = {
  build: (solution, configuration, clean) => {
    msbuild.getMSBuildPath = () => {
      return 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\MSBuild\\15.0\\Bin\\MSBuild.exe';
    };

    msbuild.sourcePath = solution;
    msbuild.configuration = configuration;
    msbuild.overrideParams.push('/p:Platform=Any CPU');
    if (clean) {
      msbuild.overrideParams.push('/t:Clean,Build');
    }
    msbuild.build();
  },
};
