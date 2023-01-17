import { app, dialog, Menu, BrowserWindow, shell, ipcMain } from 'electron'
import fs from 'fs'
import { join } from 'node:path'
import { winparams } from './conifg'
import { setWindowById, mainWindowIDProxy, getWindowById } from "./window_manager"; // 窗口管理工具
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow(winparams)
  // 该函数用于记录该新建窗口的 ID ，在后面小节会讲解到
  setWindowById(childWindow);
  console.log(arg);
  
  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}` + `#/?id=${childWindow.id.toString()}&url=${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: `#/?id=${childWindow.id.toString()}&url=${arg}` })
  }
  childWindow.webContents.on('did-finish-load', () => {
    childWindow.setTitle(arg + ' - wowEditor')
  })
  childWindow.on('close', () => {
    childWindow?.webContents.send('window-close', childWindow.id.toString())
  })
  

  return childWindow.id.toString()
})
ipcMain.handle("set-win-title", async (event, arg) => {
  try {
    getWindowById(arg.id).title = arg.title + ' - wowEditor';
    return true
  } catch (error) {
    throw error;
  }
});
ipcMain.handle("open-file", async (event, arg) => {
  try {
    const result = await dialog.showOpenDialog({
      filters: [
        // { name: "Txt Files", extensions: ["txt"] },
        { name: "md", extensions: ["md"] }
      ]
    })
    if (result.canceled === false) {
      const filePath = result.filePaths.toString();
      getWindowById(mainWindowIDProxy.value).title = filePath + ' - wowEditor';
      const data = fs.readFileSync(filePath, "utf-8")
      return {
        data,
        filePath
      }
    }
  } catch (error) {
    throw error;
  }
});

ipcMain.handle("file-update", (event, { url, content }) => {
  try {
    const status = fs.writeFileSync(url, content)
    return status
  } catch (error) {
    throw error;
  }
});

ipcMain.handle("read-file", (event, filePath) => {
  if(!/^[a-zA-Z]:\\(?:[^\\\/:*?"<>|\r\n]+\\)*[^\\\/:*?"<>|\r\n]*$/.test(filePath)) return
  try {
    const data = fs.readFileSync(filePath, "utf-8")
    return data
  } catch (error) {
    throw error;
  }
});

ipcMain.handle("get-file-path", async (event, ext = ['*']) => {
  try {
    const result = await dialog.showOpenDialog({
      filters: [
        { name: "Image", extensions: ext },
      ],
      properties: ['openFile', 'multiSelections', 'showHiddenFiles']
    })
    if (result.canceled === false && result.filePaths) {
      return result.filePaths
    }
  } catch (error) {
    throw error;
  }
});

ipcMain.handle("save-newfile", async (event, content) => {
  try {
    const result = await dialog.showSaveDialog({
      filters: [
        { name: "未命名", extensions: ["md"] },
        { name: "Custom File Types", extensions: ["as"] },
        { name: "All Files", extensions: ["*"] }
      ]
    })
    let status: any = 'error'
    if (result.canceled == false && result.filePath) {
      const filePath = result.filePath;
      status = fs.writeFileSync(filePath, content, "utf-8")
    }
    return {
      status,
      filePath: result.filePath
    }
  } catch (error) {
    throw error;
  }
});

ipcMain.handle("get-file-data", (event) => {
  try {
    let data = null;
    let url = ''
    console.log(process.argv);

    if (process.platform == 'win32' && process.argv.length >= 2 && process.argv[1] !== '.') {
      url = process.argv[1];
      data = fs.readFileSync(url, 'utf-8');
    }
    return {
      data,
      url
    };
  } catch (error) {
    throw error;
  }
});


ipcMain.handle("open-devtool", async (event, id) => {
  try {
    getWindowById(id).webContents.openDevTools()
  } catch (error) {
    throw error;
  }
});