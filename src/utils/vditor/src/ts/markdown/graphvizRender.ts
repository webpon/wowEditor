import { Constants } from "../constants";
import { graphvizRenderAdapter } from "./adapterRender";
import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render.js'


export const graphvizRender = (element: HTMLElement, cdn = Constants.CDN) => {
    const graphvizElements = graphvizRenderAdapter.getElements(element);

    if (graphvizElements.length === 0) {
        return;
    }
    graphvizElements.forEach((e: HTMLDivElement) => {
        const code = graphvizRenderAdapter.getCode(e);
        if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
            e.parentElement.classList.contains("vditor-ir__marker--pre")) {
            return;
        }

        if (e.getAttribute("data-processed") === "true" || code.trim() === "") {
            return;
        }

        try {
            new Viz({  Module, render })
                .renderSVGElement(code).then((result: HTMLElement) => {
                    e.innerHTML = result.outerHTML;
                }).catch((error) => {
                    e.innerHTML = `graphviz render error: <br>${error}`;
                    e.className = "vditor-reset--error";
                });
        } catch (e) {
            console.error("graphviz error", e);
        }

        e.setAttribute("data-processed", "true");
    });
};
