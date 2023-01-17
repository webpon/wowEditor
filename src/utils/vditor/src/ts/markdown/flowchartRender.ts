import { Constants } from "../constants";
import { flowchartRenderAdapter } from "./adapterRender";
import { default as flowchart } from 'flowchart.js'

export const flowchartRender = (element: HTMLElement, cdn = Constants.CDN) => {
    const flowchartElements = flowchartRenderAdapter.getElements(element);
    if (flowchartElements.length === 0) {
        return;
    }
    flowchartElements.forEach((item: HTMLElement) => {
        if (item.getAttribute("data-processed") === "true") {
            return;
        }
        const flowchartObj = flowchart.parse(flowchartRenderAdapter.getCode(item));
        item.innerHTML = "";
        flowchartObj.drawSVG(item);
        item.setAttribute("data-processed", "true");
    });
};
