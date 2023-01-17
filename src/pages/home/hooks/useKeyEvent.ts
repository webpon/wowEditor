import { onMounted, onUnmounted } from 'vue'
const { ipcRenderer } = require("electron");
import { MessagePlugin } from 'tdesign-vue-next'
import { keyEvent, getHashParams } from '@/utils/common'
import { saveNewFile, updateFile } from '@/node-ipc/fs'
function handleEvent(event, _this) {
    if (event.ctrlKey)
        switch (event.keyCode) {
            case 37:
                console.log('ctrl + ←')
                break
            case 38:
                console.log('ctrl + ↑')
                break
            case 39:
                console.log('ctrl + →')
                break
            case 40:
                console.log('ctrl + ↓')
                keyEvent(69, { ctrlKey: true, shiftKey: true })
                break
            case 67:
                console.log('ctrl + c')
                break
            case 83:
                console.log('ctrl + s')
                event.preventDefault()
                const url = getHashParams('url')
                event.returnValue = false // 阻止直接保存网页
                if (url && url !== 'new' && url !== 'help' && url !== 'undefined' && url !== '.') {
                    updateFile({
                        url,
                        content: _this.vditor.getValue()
                    }).then((status) => {
                        if (status) {
                            MessagePlugin.error('保存失败！')
                        } else {
                            MessagePlugin.success('保存成功')
                        }
                    });
                } else {
                    saveNewFile(_this.vditor.getValue())
                }
                break
            case 86:
                console.log('ctrl + v')
                break
            case 89:
                console.log('ctrl + y')
                if (event.ctrlKey && event.code === 'KeyY') {
                    _this.$router.go(+1)
                }
                break
            case 90:
                if (_this.$route.path === '登录成功重定向的路由，比如控制台：/dashboard') return // 防止退出项目
                if (event.ctrlKey && event.code === 'KeyZ') {
                    _this.$router.go(-1)
                }
                break
        }
}
function useKeyEvent(_this) {
    const fun = (e) => handleEvent(e, _this)
    onMounted(() => {
        window.addEventListener('keydown', fun)
    })
}

export default useKeyEvent
