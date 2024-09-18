'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var defaults = require('./defaults.js');
var makeInstaller = require('./make-installer.js');
require('./component.js');

const install = defaults.default.install;
const version = defaults.default.version;

exports.default = defaults.default;
exports.makeInstaller = makeInstaller.makeInstaller;
exports.install = install;
exports.version = version;
//# sourceMappingURL=index.js.map
