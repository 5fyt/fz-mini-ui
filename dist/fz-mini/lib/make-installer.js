'use strict';

require('./packages/constants/index.js');
var version = require('./version.js');
var key = require('./packages/constants/key.js');

const makeInstaller = (components) => {
  const install = (app) => {
    if (app[key.INSTALLED_KEY]) return;
    app[key.INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
  };
  return { install, version: version.version };
};

exports.makeInstaller = makeInstaller;
//# sourceMappingURL=make-installer.js.map
