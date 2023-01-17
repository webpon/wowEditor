<template>
    <div class="container" @click="handlerToolbar">
        <ul class="one">
            <li>
                <t-tooltip content="加粗 Ctrl+B" placement="top" :show-arrow="false" theme="light">
                    <button data-type="bold" class="context-toolbar-item">
                        <svg data-type="bold">
                            <use xlink:href="#vditor-icon-bold" data-type="bold"></use>
                        </svg>
                    </button>
                </t-tooltip>
            </li>
            <li>
                <t-tooltip content="斜体 Ctrl+I" placement="top" :show-arrow="false" theme="light">
                    <button data-type="italic" class="context-toolbar-item">
                        <svg data-type="italic">
                            <use data-type="italic" xlink:href="#vditor-icon-italic"></use>
                        </svg>
                    </button>
                </t-tooltip>
            </li>
            <li>
                <t-tooltip content="代码块 Ctrl+Shift+B" placement="top" :show-arrow="false" theme="light">
                    <button data-type="code" class="context-toolbar-item">
                        <svg data-type="code">
                            <use data-type="code" xlink:href="#vditor-icon-code"></use>
                        </svg>
                    </button>
                </t-tooltip>
            </li>
            <li>
                <t-tooltip content="链接 Ctrl+K" placement="top" :show-arrow="false" theme="light">
                    <button data-type="link" class="context-toolbar-item">
                        <svg data-type="link">
                            <use data-type="link" xlink:href="#vditor-icon-link"></use>
                        </svg>
                    </button>
                </t-tooltip>
            </li>
        </ul>
        <ul class="two">
            <li>
                <t-tooltip content="引用 Ctrl+Shift+Q" placement="bottom" :show-arrow="false" theme="light">
                    <button data-type="quote" class="context-toolbar-item">
                        <svg data-type="quote">
                            <use data-type="quote" xlink:href="#vditor-icon-quote"></use>
                        </svg>
                    </button>
                </t-tooltip>
            </li>
            <li>
                <t-tooltip content="有序列表 Ctrl+Shift+}" placement="bottom" :show-arrow="false" theme="light">
                    <button data-type="ordered-list" class="context-toolbar-item">
                        <svg data-type="ordered-list">
                            <use data-type="ordered-list" xlink:href="#vditor-icon-ordered-list"></use>
                        </svg>
                    </button>
                </t-tooltip>
            </li>
            <li>
                <t-tooltip content="无序列表 Ctrl+Shift+{" placement="bottom" :show-arrow="false" theme="light">
                    <button data-type="list" class="context-toolbar-item">
                        <svg data-type="list">
                            <use data-type="list" xlink:href="#vditor-icon-list"></use>
                        </svg>
                    </button>
                </t-tooltip>
            </li>
            <li>
                <t-tooltip content="任务列表 Ctrl+J" placement="bottom" :show-arrow="false" theme="light">
                    <button data-type="check" class="context-toolbar-item">
                        <svg data-type="check">
                            <use data-type="check" xlink:href="#vditor-icon-check"></use>
                        </svg>
                    </button>
                </t-tooltip>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { keyEvent } from '@/utils/common'
import { Button, Tooltip } from 'tdesign-vue-next';
export default {
    props: {

    },
    data() {
        return {

        };
    },
    components: {
        TButton: Button,
        TTooltip: Tooltip
    },
    mounted() {

    },
    methods: {
        handlerToolbar(e) {
            console.log(e.target);
            console.log(e.target.getAttribute('data-type'));
            switch (e.target.getAttribute('data-type')) {
                case 'bold':
                    var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="bold"]')
                    if (tooldom.click) {
                        tooldom.click()
                    } else {
                        // @ts-ignore
                        keyEvent(66, { ctrlKey: true }, document.querySelector('.vditor-reset'))
                    }
                    break;
                case 'italic':
                    var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="italic"]')
                    if (tooldom.click) {
                        tooldom.click()
                    } else {
                        // @ts-ignore
                        keyEvent(73, { ctrlKey: true }, document.querySelector('.vditor-reset'))
                    }
                    break;
                case 'code':
                    var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="code"]')
                    if (tooldom.click) {
                        tooldom.click()
                    } else {
                        // @ts-ignore
                        keyEvent(75, { ctrlKey: true, shiftKey: true }, document.querySelector('.vditor-reset'))
                    }
                    break;
                case 'link':
                    var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="link"]')
                    if (tooldom.click) {
                        tooldom.click()
                    } else {
                        // @ts-ignore
                        keyEvent(75, { ctrlKey: true }, document.querySelector('.vditor-reset'))
                    }
                    break;
                case 'quote':
                    var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="quote"]')
                    if (tooldom.click) {
                        tooldom.click()
                    } else {
                        // @ts-ignore
                        keyEvent(81, { ctrlKey: true, shiftKey: true }, document.querySelector('.vditor-reset'))
                    }
                    break;
                case 'ordered-list':
                    var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="ordered-list"]')
                    if (tooldom.click) {
                        tooldom.click()
                    } else {
                        // @ts-ignore
                        keyEvent(221, { ctrlKey: true, shiftKey: true }, document.querySelector('.vditor-reset'))
                    }
                    break;
                case 'list':
                    var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="list"]')
                    if (tooldom.click) {
                        tooldom.click()
                    } else {
                        // @ts-ignore
                        keyEvent(219, { ctrlKey: true, shiftKey: true }, document.querySelector('.vditor-reset'))
                    }
                    break;
                case 'check':
                    var tooldom: any = document.querySelector('.vditor-tooltipped[data-type="check"]')
                    if (tooldom.click) {
                        tooldom.click()
                    } 
                    break;
                default:
                    break;
            }
        }
    },
};
</script>
<script lang="ts" setup></script>

<style lang='less' scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .one,
    .two {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            flex: 1;

            &:last-child {
                padding-right: 0;
            }
        }

        .context-toolbar-item {
            cursor: pointer;
            font-size: 0;
            width: 100%;
            height: 100%;
            background-color: #f5f8fa;
            border-radius: 4px;
            border: none;
            box-shadow: inset 0 0 0 1px rgb(16 22 26 / 7%), inset 0 -1px 0 rgb(16 22 26 / 0%);

            &:hover {
                background-color: #eee;
            }

            svg {
                width: 15px;
                height: 15px;
            }
        }
    }

    .one {
        li {
            padding: 0 6px 6px 0;
        }
    }

    .two {
        li {
            padding-right: 6px;
        }
    }
}
</style>
