import { app, Menu, BrowserWindow, shell } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { winparams } from './conifg'
import { mainWindowIDProxy, setWindowById } from "./window_manager"; // 窗口管理工具
import './ipcMain'
// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  Menu.setApplicationMenu(null) // null值取消顶部菜单栏
  win = new BrowserWindow(winparams)
  // 该函数用于记录该新建窗口的 ID ，在后面小节会讲解到
  const id = setWindowById(win);
  // 这条语句用于记录主窗口 ID ，在后面小节会提到
  mainWindowIDProxy.value = id.toString();
  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url + `#/?id=${win.id.toString()}&url=${process.argv[1]}`)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml, { hash: `#/?id=${win.id.toString()}&url=${process.argv[1]}` })
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {

    if (process.argv[1] && process.argv[1] !== '.') {
      win.setTitle(process.argv[1] + ' - wowEditor')
    }
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  win.on('close', () => {
    win?.webContents.send('window-close', win.id.toString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

app.on('second-instance', (_, argv: string[]) => {
  if (process.platform !== 'darwin') {
    const url = argv[argv.length - 1];
    url && win?.webContents.send('window-open-file', url)
  }
})


