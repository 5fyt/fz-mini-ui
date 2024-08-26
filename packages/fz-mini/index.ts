import installer from './defaults'
export * from './make-installer'
export * from './component'
export default installer
export const install = installer.install
export const version = installer.version
