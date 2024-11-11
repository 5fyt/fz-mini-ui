'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var defaults = require('./defaults.js');
var makeInstaller = require('./make-installer.js');
require('./components/index.js');
var icon = require('./components/icon/src/icon.js');
var index = require('./components/icon/index.js');

const install = defaults.default.install;
const version = defaults.default.version;

exports.default = defaults.default;
exports.makeInstaller = makeInstaller.makeInstaller;
exports.iconProps = icon.iconProps;
exports.FzIcon = index.FzIcon;
exports.install = install;
exports.version = version;
//# sourceMappingURL=index.js.map
