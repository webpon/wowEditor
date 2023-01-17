import { defineStore } from 'pinia'
import store from '../index'

interface StateType {
    markdownTheme: string,
    outline: string,
    toolbar: string,
    isNew: string,
    autoSave: string,
    useInitValue: string,
    initValue: string,
    mode: string,
    background: string
}

const useStore = defineStore({
    id: 'config',
    state: (): StateType => ({
        markdownTheme: localStorage.getItem('markdownTheme') || "ant-design",
        outline: localStorage.getItem('outline') || '1',
        toolbar: localStorage.getItem('toolbar') || '1',
        isNew: localStorage.getItem('isNew') || '1',
        autoSave: localStorage.getItem('autoSave') || '0',
        useInitValue: localStorage.getItem('useInitValue') || '0',
        initValue: localStorage.getItem('initValue') || '# 默认值',
        mode: localStorage.getItem('mode') || 'wysiwyg',
        background: localStorage.getItem('background') || '',
    }),
    actions: {
        setMarkdownTheme(val: string) {
            this.markdownTheme = val
            localStorage.setItem('markdownTheme', val)
        },
        setOutline(val: string) {
            this.outline = val
            localStorage.setItem('outline', val)
        },
        setToolbar(val: string) {
            this.toolbar = val
            localStorage.setItem('toolbar', val)
        },
        setIsNew() {
            this.isNew = '0'
            localStorage.setItem('isNew', '0')
        },
        setAutoSave(val: string) {
            this.autoSave = val
            localStorage.setItem('autoSave', val)
        },
        setUseInitValue(val: string) {
            this.useInitValue = val
            localStorage.setItem('useInitValue', val)
        },
        setInitValue(val: string) {
            this.initValue = val
            localStorage.setItem('initValue', val)
        },
        setMode(val: string) {
            this.mode = val;
            (document.querySelector(`button[data-mode="${val}"]`) as HTMLElement)?.click()
            localStorage.setItem('mode', val)
        },
        setBackground(val: string) {
            this.background = val;
            localStorage.setItem('background', val)
        }
    }
})

export default function useStoreConfig() {
    return useStore(store)
}
