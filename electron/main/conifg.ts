// params.ts
import { join } from 'node:path'
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js') 
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST
export const winparams = {
    width: 1239,
    height: 766,
    resizable: true,
    minWidth: 966,
    minHeight: 696,
    transparent: false, 
    opacity: 1,
    hasShadow: true,
    movable: true, 
    minimizable: true,
    maximizable: true,
    closable: true,
    focusable: true,
    alwaysOnTop: false,
    fullscreen: false,
    fullscreenable: true,
    fullscreenWindowTitle: false,
    title: 'wowEditor',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    show: true,
    paintWhenInitiallyHidden: true,
    // frame: false,  // Specify `false` to create a frameless window. Default is `true`.
    parent: null,
    webPreferences: {
      preload,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      // 设置安全参数
      webSecurity: false, // false 之后就可以访问 本地资源文件了
    }
  }
