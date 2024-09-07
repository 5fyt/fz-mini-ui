'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var component = require('./component.js');
var makeInstaller = require('./make-installer.js');

var installer = makeInstaller.makeInstaller([...component["default"]]);

exports["default"] = installer;
//# sourceMappingURL=defaults.js.map
