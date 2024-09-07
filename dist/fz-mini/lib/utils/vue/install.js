'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const withInstall = (main, extra) => {
  ;
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.values(extra)) {
      ;
      main[key] = comp;
    }
  }
  return main;
};

exports.withInstall = withInstall;
//# sourceMappingURL=install.js.map
