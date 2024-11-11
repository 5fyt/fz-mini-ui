import installer from './defaults.mjs';
export { makeInstaller } from './make-installer.mjs';
import './components/index.mjs';
export { iconProps } from './components/icon/src/icon.mjs';
export { FzIcon } from './components/icon/index.mjs';

const install = installer.install;
const version = installer.version;

export { installer as default, install, version };
//# sourceMappingURL=index.mjs.map
