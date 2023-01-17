import useStoreConfig from "@/store/modules/config";
const storeConfig = useStoreConfig()

export async function setTheme(theme: string) {
    const loadStyle = await import(`../../styles/content-theme/${theme}.css?raw`)
    document.querySelector('#content-theme').innerHTML = loadStyle.default
    storeConfig.setMarkdownTheme(theme)
}

export async function keyEvent(keyCode: number, { ctrlKey = false, shiftKey = false, altKey = false }, dom = window) {
    if (keyCode) {
        var event = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            keyCode: keyCode,
            ctrlKey: ctrlKey,
            shiftKey: shiftKey,
            altKey: altKey
        });
        dom.dispatchEvent(event);
    }
}

export function getHashParams(key) {
    let hashParams = {};
    let e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) {
            return decodeURIComponent(s.replace(a, " "));
        },
        // Get the full hash string including the question mark
        q = window.location.hash.substring(1);

    // Remove the first part before the question mark, if present
    if (q.indexOf("?") >= 0) {
        q = q.split("?")[1];
    }

    while ((e = r.exec(q))) {
        hashParams[d(e[1])] = d(e[2]);
    }

    return hashParams[key];
}
export function updateHashParams(key, value) {
    const hash = window.location.hash;
    const split = hash.split('?')
    const pre = split[0]
    const query = split[1]
    const params = new URLSearchParams(query);
    // 设置参数 param1 的值为 newValue
    params.set(key, value);
    // 重新设置哈希字符串
    window.location.hash = pre + '?' + params.toString();
}

export function downloadCanvas(canvas, name = '未命名') {
    var a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = name;
    a.click();
}

