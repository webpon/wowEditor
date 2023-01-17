import {addStyle} from "../util/addStyle";

export const setContentTheme = (contentTheme: string, path: string = 'https://unpkg.com/vditor@3.8.18/dist/css/content-theme') => {
    if (!contentTheme || !path) {
        return;
    }
    const vditorContentTheme = document.getElementById("vditorContentTheme") as HTMLLinkElement;
    const cssPath = `${path}/${contentTheme}.css`;
    if (!vditorContentTheme) {
        addStyle(cssPath, "vditorContentTheme");
    } else if (vditorContentTheme.getAttribute("href") !== cssPath) {
        vditorContentTheme.remove();
        addStyle(cssPath, "vditorContentTheme");
    }
};
