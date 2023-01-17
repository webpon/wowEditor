import { defineStore } from 'pinia'
import store from '../index'
const id = new URL(location.href).searchParams.get('id')
interface StateType {
    markdownContent: string,
    cacheFileUrl: string,
    vditor: any
}

const useStore = defineStore({
    id: 'markdown',
    state: (): StateType => ({
        markdownContent: '',
        cacheFileUrl: localStorage.getItem(id + 'cacheFileUrl') || '',
        vditor: null
    }),
    actions: {
        setVditor(data) {
            this.vditor = data  
        },
        setMarkdownContent(data: string) {
            // postMessage({ payload: 'appendLoading' }, '*')
            this.markdownContent = data    
            // localStorage.setItem(id + 'markdownContent', data)
        },
        setCacheFileUrl(data: string, winId = id) {
            this.cacheFileUrl = data
            localStorage.setItem(winId + 'cacheFileUrl', data)
        },
    }
})

export default function useStoreMarkdown() {
    return useStore(store)
}
