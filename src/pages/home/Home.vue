<template>
    <div class="container">
        <ChevronUpIcon v-show="showBacktoTop" class="backtotop" @click="toTop">
        </ChevronUpIcon>
        <ContextMenu />
        <div ref="vditor" id="vditor" class="vditor vditor--fullscreen" />
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { MessagePlugin } from 'tdesign-vue-next';
import { ChevronUpIcon } from 'tdesign-icons-vue-next'

import useStoreMarkdown from "@/store/modules/markdown";
import useStoreConfig from "@/store/modules/config";
import Vditor from '@/utils/vditor/src/index';
import tipsMd from '@/example/tips.md?raw'
import { setTheme, getHashParams, updateHashParams } from '@/utils/common/index'
import useDragFile from './hooks/useDragFile'
import useKeyEvent from './hooks/useKeyEvent'
import { useListenCopy } from './hooks/useListenEvent'
import { useBackToTop, toTop } from './hooks/useBackToTop'
import { useHideTool } from './hooks/useHideTool'
import { useEventHandle } from './hooks/useEventHandle'
import { useSetEditorBackground } from '@/hooks/useSetEditorBackground'
import ContextMenu from './component/ContextMenu.vue'
import { readFile, updateFile } from '@/node-ipc/fs'
export default {
    name: "App",
    data() {
        return {
            contentEditor: '',
            vditor: null,
            baseLink: '',
            showBacktoTop: false
        };
    },
    components: {
        ChevronUpIcon,
        ContextMenu
    },
    computed: {
        // @ts-ignore
        ...mapState(useStoreMarkdown, ['markdownContent', 'cacheFileUrl']),
        // @ts-ignore
        ...mapState(useStoreConfig, ['markdownTheme', 'outline', 'toolbar', 'isNew', 'autoSave', 'initValue', 'useInitValue', 'mode', 'background']),
    },
    watch: {
        markdownContent: {
            handler: function (newV) {
                this.renderMarkdown(newV)
            },
        },
        markdownTheme: {
            handler: function (newV) {
                setTheme(newV)
            },
            immediate: true
        },
        toolbar: {
            handler: function (newV) {
                if (newV === '1') {
                    (document.querySelector('.vditor-toolbar') as HTMLDivElement).style.display = 'block';
                    (document.querySelector('.vditor-toolbar') as HTMLDivElement).style.height = 'auto';
                } else {
                    (document.querySelector('.vditor-toolbar') as HTMLDivElement).style.display = 'none'
                }
            },
        },
        outline: {
            handler: function (newV) {
                (document.querySelector('.vditor-menu-outline') as HTMLDivElement).click()
            },
        },
        cacheFileUrl: {
            handler: function (newV) {
                this.baseLink = this.cacheFileUrl ? String.raw`${this.cacheFileUrl.replaceAll("\\", "\/")}`.replace(/(.*\/).*/, ($1, $2) => $2) : ''
            },
            immediate: true
        },
    },
    created() {
        useKeyEvent(this)
        useListenCopy()
    },
    async mounted() {
        const url = getHashParams('url')
        let content = (this.isNew === '1' || url === 'help') ? tipsMd : (this.useInitValue === '1' ? this.initValue : '')
        // 主窗口
        if (url && url !== 'new' && url !== 'help' && url !== 'undefined' && url !== '.' && this.isNew === '0') {
            try {
                content = await readFile(url)
                this.renderMarkdown(content)
            } catch (error) {
                MessagePlugin.error({ content: error.msg, duration: 1000 })
                updateHashParams('url', 'new')
                this.renderMarkdown('')
            }
        } else {
            this.renderMarkdown(content)
        }

        this.isNew === '1' && this.setIsNew()
    },
    methods: {
        // @ts-ignore
        ...mapActions(useStoreConfig, ['setIsNew']),
        // @ts-ignore
        ...mapActions(useStoreMarkdown, ['setVditor']),
        // @ts-ignore
        renderMarkdown(content) {
            const _this = this
            this.$nextTick(() => {
                this.vditor = new Vditor('vditor', {
                    mode: this.mode || 'wysiwyg',
                    toolbar: ['emoji', 'headings', 'bold', 'italic', 'strike', '|', 'line', 'quote', 'list', 'ordered-list', 'check', 'outdent', 'indent', 'code', 'inline-code', '|', 'insert-before', 'insert-after', 'undo', 'redo', 'upload', 'link', 'table', 'edit-mode', 'both', 'code-theme', 'outline'],
                    outline: {
                        enable: this.outline === '1',
                        position: 'left'
                    },
                    cache: {
                        enable: false
                    },
                    toolbarConfig: {
                        hide: this.toolbar === '0'
                    },
                    counter: {
                        enable: true,
                        type: 'text',
                    },
                    preview: {
                        markdown: {
                            linkBase: this.baseLink,
                            autoSpace: true
                        },
                    },
                    input: (val: string) => {
                        const url = getHashParams('url')
                        if (this.autoSave === '1' && url !== 'help' && url && url !== 'new' && url !== 'undefined' && url !== '.') {
                            updateFile({ url, content: val })
                        }
                    },
                    value: content,
                    after: () => {
                        useDragFile(this);
                        useBackToTop(this);
                        useHideTool();
                        useSetEditorBackground(this.background);
                        useEventHandle(this);
                        (document.querySelector('.load-wrapper') as HTMLDivElement).style.display = 'none'
                        this.vditor.focus();
                        this.dragControllerDiv();

                        document.querySelector('.vditor-wysiwyg').addEventListener('contextmenu', (e: any) => {
                            this.onContextMenu(e, this.vditor)
                        })
                    },
                });
                this.setVditor(this.vditor)
            })
        },
        updateMarkdown(content) {
            this.vditor.setValue(content);
        },
        dragControllerDiv() {
            var resize: any = document.getElementsByClassName("outline_bar");
            var left: any = document.getElementsByClassName("vditor-outline");
            var mid: any = document.getElementsByClassName("vditor-wysiwyg");
            var box = document.getElementsByClassName("vditor-content");
            for (let i = 0; i < resize.length; i++) {
                // // 鼠标按下事件
                resize[i].onmousedown = function (e) {
                    //颜色改变提醒
                    resize[i].style.background = "#818181";
                    var startX = e.clientX;
                    resize[i].left = resize[i].offsetLeft;
                    // 鼠标拖动事件
                    document.onmousemove = function (e) {
                        var endX = e.clientX;
                        var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
                        var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

                        if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
                        if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px

                        resize[i].style.left = moveLen; // 设置左侧区域的宽度

                        for (let j = 0; j < left.length; j++) {
                            left[j].style.width = moveLen + "px";
                            mid[j].style.width = box[i].clientWidth - moveLen - 10 + "px";
                        }
                    };
                    // 鼠标松开事件
                    document.onmouseup = function (evt) {
                        //颜色恢复
                        resize[i].style.background = "";
                        document.onmousemove = null;
                        document.onmouseup = null;
                        resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                    };
                    resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
                    return false;
                };
            }
        },
        onContextMenu(e: MouseEvent, vditor) {
            ContextMenu.methods.handleContext(e, vditor)
        },
        toTop
    }
};
</script>

<style lang="less" scoped>
.backtotop {
    position: fixed;
    z-index: 99999;
    bottom: 80px;
    right: 120px;
    font-size: 33px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>


