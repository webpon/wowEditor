// window_manager.ts
const winDict = {};


export const WindowDictProxy = new Proxy(winDict, {
    get: function (obj, prop: string) {
        return obj[prop]
    },
    set: function (obj, prop: string, value: EWindow) {
        if (obj[prop]) {
            console.error(`Window id '${prop}' has already existed.`)
            return false
        } else {
            obj[prop] = value;
            return true;
        }
    },
    has(target, key: string) {
        if (Object.getOwnPropertyNames(target).includes(key)) {
            return true
        } else {
            return false
        }
    },
    ownKeys: function (target) {
        return [...Object.getOwnPropertyNames(target)]
    },
    deleteProperty: function (target, prop: string) {
        try {
            delete target[prop]
            return true;
        } catch (e) {
            console.warn(e);
            return false;
        }
    }
})

// window_manager.ts
/**通过ID索引窗口 */
export function getWindowById(id: string): EWindow {
    return WindowDictProxy[id]
}

// window_manager.ts

/**通过 ID 关闭窗口 */
function hideWindowById(id: string) {
    try {
        getWindowById(id).hide()
        return true;
    } catch (e) {
        console.error(`Can not hide Window By ID '${id}', as the following reasons:\n${e}`)
        return false;
    }
}

/**通过 ID 显示窗口 */
function showWindowById(id: string) {
    try {
        getWindowById(id).show()
        return true;
    } catch (e) {
        console.error(`Can not show Window By ID '${id}', as the following reasons:\n${e}`)
        return false;
    }
}

/**通过 ID 隐藏窗口 */
function closeWindowById(id: string) {
    try {
        getWindowById(id).close();
        delete WindowDictProxy[id];
        return true;
    } catch (e) {
        console.error(`Can not close Window By ID '${id}', as the following reasons:\n${e}`)
        return false;
    }
}

/**通过 ID 最大化窗口 */
function maximizeWindowById(id: string) {
    try {
        getWindowById(id).maximize();
        delete WindowDictProxy[id];
        return true;
    } catch (e) {
        console.error(`Can not maximize Window By ID '${id}', as the following reasons:\n${e}`)
        return false;
    }
}

/**通过 ID 最小化窗口 */
function minimizeWindowById(id: string) {
    try {
        getWindowById(id).minimize();
        delete WindowDictProxy[id];
        return true;
    } catch (e) {
        console.error(`Can not minimize Window By ID '${id}', as the following reasons:\n${e}`)
        return false;
    }
}

/**通过 ID 还原窗口 */
function restoreWindowById(id: string) {
    try {
        getWindowById(id).restore();
        delete WindowDictProxy[id];
        return true;
    } catch (e) {
        console.error(`Can not restore Window By ID '${id}', as the following reasons:\n${e}`)
        return false;
    }
}


// window_manager.ts

/**关闭所有窗口 */
function closeAllWindows() {
    Object.getOwnPropertyNames(WindowDictProxy).forEach(
        (id: string) => {
            WindowDictProxy[id].close();
            delete WindowDictProxy[id];
        }
    )
}
// window_manager.ts

const mainWindowID: { value: undefined | string } = { value: undefined };
export const mainWindowIDProxy = new Proxy(mainWindowID, {
    get: function (obj: { value: undefined | string }, prop: string) {
        return obj.value
    },
    set: function (obj: { value: undefined | string }, prop: 'value', value) {
        obj['value'] = value
        return true;
    }
})

// window_manager.ts
/** 通过 id 托管窗口 */
export function setWindowById(Window: EWindow) {
    try {
        const id = Window.id.toString();
        console.log(id, 'id');
        
        WindowDictProxy[id] = Window;
        return id;
    }
    catch (e) {
        console.error(`Can not set Window By ID '${Window.id}', as the following reasons:\n${e}`)
        return;
    }
}

