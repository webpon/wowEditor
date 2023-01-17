import { lstat } from 'node:fs/promises'
import { cwd } from 'node:process'
import { ipcRenderer } from 'electron'
import { MessagePlugin } from 'tdesign-vue-next';

ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

ipcRenderer.on('window-close', (_event, id) => {
  localStorage.removeItem(id + 'cacheFileUrl')
  localStorage.removeItem(id + 'markdownContent')
})
ipcRenderer.on('window-open-file', (_event, url) => {
  ipcRenderer.invoke("open-win", url).then((res) => {
    console.log(res);
  }).catch(e => {
    MessagePlugin.error(e.message || '未知错误')
  });;
})

export function setWinTitle(id, title) {
  ipcRenderer.invoke("set-win-title", {id, title}).then((res) => {
    console.log(res);
  }).catch(e => {
    MessagePlugin.error(e.message || '未知错误')
  });;
}

lstat(cwd()).then(stats => {
  console.log('[fs.lstat]', stats)
}).catch(err => {
  console.error(err)
})
