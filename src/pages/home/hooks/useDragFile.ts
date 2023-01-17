import { onUnmounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { readFile } from '@/node-ipc/fs'
import { setWinTitle } from '@/node-ipc/node-api'
import { getHashParams, updateHashParams } from '@/utils/common/index'
const dropHandle = async (e, _this) => {
    //必须要阻止拖拽的默认事件
    e.preventDefault();
    e.stopPropagation();

    //获得拖拽的文件集合
    var files = e.dataTransfer.files;

    if (files.length > 0) {
        const filePath = files[0].path
        const result = filePath.match(/\.([^.]+)$/);
        if (result && result[1] === 'md') {
            const content = await readFile(filePath)
            updateHashParams('url', filePath)
            setWinTitle(getHashParams('id'), filePath)
            _this.renderMarkdown(content)
        } else {
            MessagePlugin.warning('暂不支持此格式文件')
        }
    }
}
const editorDropHandle = async (e, _this) => {
    //必须要阻止拖拽的默认事件
    e.preventDefault();
    e.stopPropagation();
    //获得拖拽的文件集合
    var files = e.dataTransfer?.files;
    if (files.length > 0) {
        const filePath = files[0].path
        const result = filePath.match(/\.([^.]+)$/);
        if (result && result[1] === 'md') {
            const content = await readFile(files[0].path)
            updateHashParams('url', files[0].path)
            setWinTitle(getHashParams('id'), filePath)
            _this.renderMarkdown(content)
        }
    }
}

function useDragFile(_this) {
    const dropfun = (e) => dropHandle(e, _this)
    const editDropfun = (e) => editorDropHandle(e, _this)
    const dragoverfun = (e) => e.preventDefault()
    document.addEventListener('drop', dropfun);
    // 这个事件是必须添加的，不添加这个dragover事件，drop事件触发不了)
    document.addEventListener('dragover', dragoverfun)

    document.querySelector('.vditor-reset').addEventListener('drop', editDropfun)
    // 这个事件是必须添加的，不添加这个dragover事件，drop事件触发不了)
    document.querySelector('.vditor-reset').addEventListener('dragover', dragoverfun)
    onUnmounted(() => {
        document.removeEventListener('drop', dropfun)
        document.removeEventListener('dragover', dragoverfun)
        document.querySelector('.vditor-reset').removeEventListener('drop', editDropfun)
        // 这个事件是必须添加的，不添加这个dragover事件，drop事件触发不了)
        document.querySelector('.vditor-reset').removeEventListener('dragover', dragoverfun)
    })
}


export default useDragFile