export const useEventHandle = (_this) => {
    const vditor = document.getElementsByClassName('vditor-wysiwyg')[0]
    vditor.addEventListener('click', (e) => {
        e.preventDefault()
        if(e.target === vditor) {
            _this.vditor.focus();
        }
    })
}