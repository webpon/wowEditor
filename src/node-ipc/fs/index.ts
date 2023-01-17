const { ipcRenderer } = require("electron");
import { updateHashParams } from '@/utils/common/index'
import { MessagePlugin } from 'tdesign-vue-next';
// 读取文件
export async function readFile(url) {
    try {
        const data = await ipcRenderer.invoke("read-file", url)
        return data
    } catch (error) {
        MessagePlugin.error(error.message || '未知错误')
    }

}

// 更新文件
export async function updateFile({ url, content }) {
    try {
        const data = await ipcRenderer.invoke("file-update", { url, content })
        return data
    } catch (error) {
        MessagePlugin.error(error.message || '未知错误')
    }
}

// 新建文件并保存
export async function saveNewFile(content) {
    try {
        const res = await ipcRenderer.invoke("save-newfile", content)
        if (res.status) {
            MessagePlugin.error('保存失败！')
        } else {
            updateHashParams('url', res.filePath)
            MessagePlugin.success('保存成功')
        }
    } catch (error) {
        MessagePlugin.error(error.message || '未知错误')
    }
}
// 选取文件
export async function selectFile(ext) {
    try {
        const res = await ipcRenderer.invoke("get-file-path", ext)
        return res
    } catch (error) {
        MessagePlugin.error(error.message || '未知错误')
    }
}