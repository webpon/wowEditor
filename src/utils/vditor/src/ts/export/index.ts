import { getMarkdown } from "../markdown/getMarkdown";

export const download = (vditor: IVditor, content: string, filename: string) => {
    const aElement = document.createElement("a");
    if ("download" in aElement) {
        aElement.download = filename;
        aElement.style.display = "none";
        aElement.href = URL.createObjectURL(new Blob([content]));

        document.body.appendChild(aElement);
        aElement.click();
        aElement.remove();
    } else {
        vditor.tip.show(window.VditorI18n.downloadTip, 0);
    }
};

export const exportMarkdown = (vditor: IVditor) => {
    const content = getMarkdown(vditor);
    download(vditor, content, content.substr(0, 10) + ".md");
};

export const exportPDF = (vditor: IVditor) => {
    vditor.tip.show(window.VditorI18n.generate);
    const iframe = document.querySelector("#vditorExportIframe") as HTMLIFrameElement;
    let timer = null
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
        printPdf()
    }, 3000);
      
    function printPdf() {
        iframe.contentDocument.open();
        iframe.contentDocument.write(`<link rel="stylesheet" href="${vditor.options.cdn}/dist/index.css"/>
            <script src="${vditor.options.cdn}/dist/method.min.js"></script>
            <div id="preview" style="width: 800px"></div>
            <script>
            window.addEventListener("message", (e) => {
            if(!e.data) {
                return;
            }
            Vditor.preview(document.getElementById('preview'), e.data, {
                markdown: {
                theme: "${vditor.options.preview.theme}"
                },
                hljs: {
                style: "${vditor.options.preview.hljs.style}"
                },
                after: () => {
                    window.print();
                }
            });
            }, false);
            </script>`);
        iframe.contentDocument.close();
        setTimeout(() => {
            iframe.contentWindow.postMessage(getMarkdown(vditor), "*");
            vditor.tip.hide()
        }, 200);
    }
};

export const exportHTML = (vditor) => {
    const content = vditor.getValue();
    console.log(content);

    const html = `<!DOCTYPE html>
    <html lang="zh-cmn-Hans">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <title>wowEditor</title>
        <link rel="stylesheet" href="https://unpkg.com/vditor/dist/index.css" />
        <script src="https://unpkg.com/vditor/dist/index.min.js"></script>
        <style>
            body {
                margin: 0;
                padding: 0;
            }
            .wrapper {
                width: 100%;
                height: 100%;
            }
            .vditor {
                min-height: 100vh;
            }
            .vditor-toolbar {
                display: none;
            }
            .vditor-preview__action {
                display: none;
            }
            .vditor-outline {
                position: fixed;
                min-height: 100vh;
            }
            .content {
                display: none;
            }
            .vditor-outline__content>ul {
                overflow: auto;
                height: calc(100vh - 27px);
            }
        </style>
    </head>
    
    <body>
        <div class="wrapper">
            <div id="vditor"></div>
        </div>
        <div class="content">${content}</div>
        <!-- end main -->
        <script>
            const preVditor = new Vditor('vditor', {
                outline: {
                    enable: true,
                    position: 'left'
                },
                after: () => {
                    preVditor.setValue(document.getElementsByClassName('content')[0].innerText)
                    document.querySelector('button[data-type="preview"]').click()   
                }
            })
        </script>
    </body>
    
    </html>`
    download(vditor, html, content.substr(0, 10) + ".html");
};
