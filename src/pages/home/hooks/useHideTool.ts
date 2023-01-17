export const useHideTool = () => {
    // 隐藏一些工具栏
    if (document.querySelector('.vditor-tooltipped[data-type="outline"]')) {
        (document.querySelector('.vditor-tooltipped[data-type="outline"]') as HTMLDivElement).style.display = 'none'
    }
    if (document.querySelector('.vditor-toolbar--hide')) {
        (document.querySelector('.vditor-toolbar--hide') as HTMLDivElement).style.display = 'none'
    }
    if (document.querySelector('.vditor-tooltipped[data-type="edit-mode"]')) {
        (document.querySelector('.vditor-tooltipped[data-type="edit-mode"]') as HTMLDivElement).style.display = 'none'
    }
    if (document.querySelector('.vditor-tooltipped[data-type="upload"]')) {
        (document.querySelector('.vditor-tooltipped[data-type="upload"]') as HTMLDivElement).style.display = 'none'
    }

    if (document.querySelector('.vditor-tooltipped[data-type="code-theme"]')) {
        (document.querySelector('.vditor-tooltipped[data-type="code-theme"]') as HTMLDivElement).style.display = 'none'
    }
}