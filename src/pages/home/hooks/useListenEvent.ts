import { MessagePlugin } from 'tdesign-vue-next';

export const useListenCopy = () => {
    document.addEventListener('copy', () => {
        MessagePlugin.success('ε€εΆζε')
    })
}