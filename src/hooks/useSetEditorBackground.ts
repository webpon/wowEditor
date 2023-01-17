export const useSetEditorBackground = (val) => {
    (document.querySelector('#vditor') as HTMLElement).style.background = val;
    (document.querySelector('.vditor-outline') as HTMLElement).style.background = val
}