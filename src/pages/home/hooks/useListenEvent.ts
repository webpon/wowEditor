import { MessagePlugin } from 'tdesign-vue-next';

export const useListenCopy = () => {
    document.addEventListener('copy', () => {
        MessagePlugin.success('复制成功')
    })
}