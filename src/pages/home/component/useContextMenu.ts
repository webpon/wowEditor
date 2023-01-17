import ContextMenu from '@imengyu/vue3-context-menu'
import { Icon, MessagePlugin } from 'tdesign-vue-next'
import { h } from 'vue'
import { downloadCanvas } from '@/utils/common'
// import { uploadImg } from '@/utils/picgo'
import ContextMenuToolbar from './ContextMenuToolbar.vue'

const getTemplate = (src: string, zoom: string, display: string, type: string) => {
    if (type === 'P') {
        return `<div class="vditor-wysiwyg__block" data-type="html-block" data-block="0"><pre style="display:none"><code>&lt;img src="${src}" alt="img" style="zoom:${zoom};display: ${display};margin: 0 auto;" /&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><img src="${src}" alt="img" style="zoom:${zoom};display: ${display};margin: 0 auto;"></pre></div>`
    } else if (type === 'BPRE') {
        return `<pre style="display:none"><code>&lt;img src="${src}" alt="img" style="zoom:${zoom};display: ${display};margin: 0 auto;" /&gt;</code></pre>`
    } else if (type === 'IPRE') {
        return `<pre class="vditor-wysiwyg__preview" data-render="1"><img src="${src}" alt="img" style="zoom:${zoom};display: ${display};margin: 0 auto;"></pre>`
    } else if (type === 'LI') {
        return `<pre style="display:none"><code>&lt;img src="${src}" alt="img" style="zoom:${zoom};display: ${display};margin: 0 auto;" /&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><img src="${src}" alt="img" style="zoom:${zoom};display: ${display};margin: 0 auto;"></pre>`
    }
}
const handlerPicture = ({ e, zoom = undefined, display = undefined }) => {
    const zoomStyle = zoom || e.target.style.zoom
    const displayStyle = display || e.target.style.display
    const parentNode = e.target.parentNode
    if (parentNode.tagName === 'P') {
        parentNode.innerHTML = getTemplate(e.target.src, zoomStyle, displayStyle, 'P')
    } else if (parentNode.tagName === 'PRE') {
        parentNode.previousElementSibling.outerHTML = getTemplate(e.target.src, zoomStyle, displayStyle, 'BPRE')
        parentNode.outerHTML = getTemplate(e.target.src, zoomStyle, displayStyle, 'IPRE')
    } else if (parentNode.tagName === 'LI') {
        e.target.outerHTML = getTemplate(e.target.src, zoomStyle, displayStyle, 'LI')
    } else if (parentNode.tagName === 'OL') {
        e.target.outerHTML = getTemplate(e.target.src, zoomStyle, displayStyle, 'OL')
    }
}

export function handleContextMenu(e: any, vditor, _this) {
    console.log(e.target.tagName);

    e.preventDefault();
    const items: any = [
        {
            label: "在上方插入一行",
            onClick: () => {
                // @ts-ignore
                document.querySelector('.vditor-tooltipped[data-type="insert-before"]')?.click()
            }
        },
        {
            label: "在下方插入一行",
            onClick: () => {
                // @ts-ignore
                document.querySelector('.vditor-tooltipped[data-type="insert-after"]')?.click()
            }
        },
        {
            label: "删除当前模块",
            divided: true,
            onClick: () => {
                // @ts-ignore
                document.querySelector('.vditor-tooltipped[data-type="remove"]')?.click()
            }
        },
        {
            label: h(ContextMenuToolbar),
            customClass: "toolbox-menu",
            divided: true,
            onClick: () => {
                e.preventDefault()
            }
        }
    ]
    if (e.target.tagName === 'IMG') {
        items.push(
            {
                label: "缩放图片",
                children: [
                    {
                        label: "10%",
                        onClick: () => {
                            handlerPicture({ e, zoom: '10%' })
                        }
                    },
                    {
                        label: "25%",
                        onClick: () => {
                            handlerPicture({ e, zoom: '25%' })
                        }
                    },
                    {
                        label: "50%",
                        onClick: () => {
                            handlerPicture({ e, zoom: '50%' })
                        }
                    },
                    {
                        label: "75%",
                        divided: "true",
                        onClick: () => {
                            handlerPicture({ e, zoom: '75%' })
                        }
                    },
                    {
                        label: "100%",
                        divided: "true",
                        onClick: () => {
                            handlerPicture({ e, zoom: '100%' })
                        }
                    },
                    {
                        label: "125%",
                        onClick: () => {
                            handlerPicture({ e, zoom: '125%' })
                        }
                    },
                    {
                        label: "150%",
                        onClick: () => {
                            handlerPicture({ e, zoom: '150%' })
                        }
                    },
                ],
            },
            {
                label: "居中",
                icon: h(Icon, {
                    size: '20px',
                    name: 'format-vertical-align-center',
                    style: {
                        marginRight: '8px'
                    }
                }),
                onClick: () => {
                    try {
                        handlerPicture({ e, display: 'block' })
                    } catch (error) {
                        MessagePlugin.warning({ content: '未知错误', duration: 1000 })
                    }
                }
            },
            {
                label: "居左",
                icon: h(Icon, {
                    size: '20px',
                    name: 'format-vertical-align-left',
                    style: {
                        marginRight: '8px'
                    }
                }),
                onClick: () => {
                    try {
                        e.target.style.display = 'inline-block'
                    } catch (error) {
                        MessagePlugin.warning({ content: '未知错误', duration: 1000 })
                    }
                }
            },
            // {
            //     label: "上传图片",
            //     onClick: () => {
            //         const blob = base64ImgtoFile(e.target.src)
            //         const blobUrl = window.URL.createObjectURL(blob);
            //         // console.log('--------------------');
            //         // console.log(blobUrl);
            //         console.log(decodeURIComponent(e.target.src));
                    
            //         uploadImg(blobUrl).then(res => {
            //             console.log(res);
            //             if(res[0]?.imgUrl) {
            //                 console.log(res);
            //                 MessagePlugin.success('上传成功')
            //                 e.target.src = res[0].imgUrl
            //             } else {
            //                 MessagePlugin.error('上传失败')
            //             }
            //         })
            //     }
            // },
            {
                label: "另存为",
                onClick: () => {
                        var link = document.createElement("a");
                        link.href = e.target.src;
                        link.download = e.target.title || 'image';
                        link.click();
                }
            },
            {
                label: "复制图片",
                onClick: () => {
                    const el = document.createElement('input');
                    el.value = `![${e.target.title}](${e.target.src})`
                    el.setAttribute('readonly', '');
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                }
            }
        )
    }
    if (e.target.tagName === 'CANVAS') {
        items.push({
            label: "导出为图片",
            onClick: () => {
                downloadCanvas(e.target)
            }
        })
    }
    if (['P', 'LI', 'UI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(e.target.tagName))
        items.push({
            label: "插入",
            children: [
                {
                    label: "图片",
                    divided: true,
                    onClick: () => {
                        vditor.insertValue('![newimg]()')
                        _this.pictureVisible = true
                    }
                },
                {
                    label: "表格 Ctrl+T",
                    onClick: () => {
                        var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="table"]')
                        if (tooldom.click) {
                            tooldom.click()
                        }
                    }
                },
                {
                    label: "分割线 Ctrl+Shift+H",
                    onClick: () => {
                        var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="line"]')
                        if (tooldom.click) {
                            tooldom.click()
                        }
                    }
                }
            ]
        },)
    if (items.length > 0)
        ContextMenu.showContextMenu({
            x: e.x,
            y: e.y,
            items: items,
            minWidth: 530,
        });
}