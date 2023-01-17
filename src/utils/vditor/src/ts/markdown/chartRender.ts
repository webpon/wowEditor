import {Constants} from "../constants";
import {chartRenderAdapter} from "./adapterRender";
import * as echarts from 'echarts'

export const chartRender = (element: (HTMLElement | Document) = document, cdn = Constants.CDN, theme: string) => {
    const echartsElements = chartRenderAdapter.getElements(element);
    if (echartsElements.length > 0) {
            echartsElements.forEach((e: HTMLDivElement) => {
                if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                    e.parentElement.classList.contains("vditor-ir__marker--pre")) {
                    return;
                }

                const text = chartRenderAdapter.getCode(e).trim();
                // 存在安全隐患，为了兼容性，先这样处理
                const objText = eval("("+text+")");
                if(!objText.toolbox) {
                    objText.toolbox = {}
                }
                if(!objText.toolbox.feature) {
                    objText.toolbox.feature = {}
                }
                objText.toolbox.show = {}
                objText.toolbox.feature.saveAsImage = {}
                if (!text) {
                    return;
                }
                try {
                    if (e.getAttribute("data-processed") === "true") {
                        return;
                    }
                    const option = objText;
                    echarts.init(e, theme === "dark" ? "dark" : undefined).setOption(option);
                    e.setAttribute("data-processed", "true");
                } catch (error) {
                    e.className = "vditor-reset--error";
                    e.innerHTML = `echarts render error: <br>${error}`;
                }
        });
    }
};
