'use strict';

require('./props/index.js');
var install = require('./install.js');
require('./typescript.js');
var runtime = require('./props/runtime.js');



exports.withInstall = install.withInstall;
exports.definePropType = runtime.definePropType;
//# sourceMappingURL=index.js.map
