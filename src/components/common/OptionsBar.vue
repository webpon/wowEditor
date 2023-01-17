<template>
    <div>
        <div class="window-options" v-if="!IsUseSysTitle && isNotMac && !IsWeb">
            <t-dropdown :min-column-width="88" trigger="click">
                <span class="option-item">
                    文件
                </span>
                <t-dropdown-menu class="hhh">
                    <t-dropdown-item @click="createNewFile">新建文件</t-dropdown-item>
                    <t-dropdown-item @click="openFile" :divider="true">打开文件</t-dropdown-item>
                    <t-dropdown-item @click="keyEvent(83, { ctrlKey: true })">保存</t-dropdown-item>
                    <t-dropdown-item :divider="true">另存为</t-dropdown-item>
                    <t-dropdown-item @click="openSetting">偏好设置</t-dropdown-item>
                </t-dropdown-menu>
            </t-dropdown>
            <t-dropdown :min-column-width="88" trigger="click">
                <span class="option-item">
                    主题
                </span>
                <t-dropdown-menu :hideAfterItemClick="false">
                    <t-dropdown-item @click="setTheme('ant-design')" index="1"
                        :prefixIcon="storeConfig.markdownTheme === 'ant-design' || !storeConfig.markdownTheme ? renderCheckIcon : null">Ant
                        Design</t-dropdown-item>
                    <t-dropdown-item @click="setTheme('dark')"
                        :prefixIcon="storeConfig.markdownTheme === 'dark' ? renderCheckIcon : null">Dark</t-dropdown-item>
                    <t-dropdown-item @click="setTheme('light')"
                        :prefixIcon="storeConfig.markdownTheme === 'light' ? renderCheckIcon : null">Light</t-dropdown-item>
                    <t-dropdown-item @click="setTheme('wechat')"
                        :prefixIcon="storeConfig.markdownTheme === 'wechat' ? renderCheckIcon : null">Wechat</t-dropdown-item>
                    <t-dropdown-item @click="setTheme('purple')" 
                        :prefixIcon="storeConfig.markdownTheme === 'purple' ? renderCheckIcon : null">purple</t-dropdown-item>
                </t-dropdown-menu>
            </t-dropdown>
            <t-popup :visible="showEditorColor" trigger="click" class="placement bottom left" placement="bottom-left">
                <template #content>
                    <div>
                        <t-color-picker-panel :value="storeConfig.background" format="RGBA" :recentColors="null" enableAlpha @change="handleEditorColorChange"/>
                        <div style="padding: 10px;display: flex; flex-direction: row-reverse;">
                            <t-button size="small" style="margin-left: 10px;" @click="showEditorColor = false">确定</t-button>
                            <t-button size="small" theme="default" @click="resetEditorColor">重置</t-button>
                        </div>
                    </div>
                </template>
                <span class="option-item" @click="showEditorColor = true">
                    背景色
                </span>
            </t-popup>
            <t-dropdown trigger="click" popper-class="menu-popper">
                <span class="option-item">
                    视图
                </span>
                <template #dropdown>
                    <t-dropdown-menu>
                        <t-dropdown-item @click="setOutline"
                            :prefixIcon="storeConfig.outline === '0' ? renderCheckIcon : null">隐藏侧边栏</t-dropdown-item>
                        <t-divider style="margin: 0" />
                        <t-dropdown-item @click="setToolbar"
                            :prefixIcon="storeConfig.toolbar === '0' ? renderCheckIcon : null"
                            :divider="true">隐藏工具栏</t-dropdown-item>
                        <t-dropdown-item>
                            编辑器模式
                            <t-dropdown-menu>
                                <t-dropdown-item :prefixIcon="storeConfig.mode === 'wysiwyg' ? renderCheckIcon : null"
                                    @click="setMode('wysiwyg')">所见即所得</t-dropdown-item>
                                <t-dropdown-item :prefixIcon="storeConfig.mode === 'sv' ? renderCheckIcon : null"
                                    @click="setMode('sv')">分屏预览</t-dropdown-item>
                            </t-dropdown-menu>
                        </t-dropdown-item>
                        <t-dropdown-item @click="openDevtool">开发者工具</t-dropdown-item>
                    </t-dropdown-menu>
                </template>
            </t-dropdown>
            <t-dropdown trigger="click" popper-class="menu-popper">
                <span class="option-item">
                    导出
                </span>
                <template #dropdown>
                    <t-dropdown-menu>
                        <t-dropdown-item @click="exportMarkdown(storeMarkdown.vditor.vditor)">Markdown</t-dropdown-item>
                        <t-divider style="margin: 0" />
                        <t-dropdown-item @click="exportPDF(storeMarkdown.vditor.vditor)">PDF</t-dropdown-item>
                        <t-divider style="margin: 0" />
                        <t-dropdown-item @click="exportHTML(storeMarkdown.vditor)">HTML</t-dropdown-item>
                    </t-dropdown-menu>
                </template>
            </t-dropdown>
            <t-dropdown trigger="click" popper-class="menu-popper">
                <span class="option-item">
                    帮助
                </span>
                <template #dropdown>
                    <t-dropdown-menu>
                        <t-dropdown-item :divider="true" @click="openHelpWin">使用教程</t-dropdown-item>
                        <t-dropdown-item @click="centerDialogVisible = true">关于</t-dropdown-item>
                    </t-dropdown-menu>
                </template>
            </t-dropdown>
        </div>
        <About :visiable="centerDialogVisible" @close="centerDialogVisible = false" />
        <Setting :visiable="settingVisiable" @close="settingVisiable = false" />
    </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { MessagePlugin } from 'tdesign-vue-next'
import { CheckIcon } from 'tdesign-icons-vue-next';

import useStoreMarkdown from "@/store/modules/markdown";
import useStoreConfig from "@/store/modules/config";
import Setting from '@/pages/setting/Setting.vue'
import About from '@/pages/about/About.vue'
import { exportHTML, exportMarkdown, exportPDF } from "@/utils/vditor/src/ts/export";


import { keyEvent, getHashParams, updateHashParams } from '@/utils/common'
import { useSetEditorBackground } from '@/hooks/useSetEditorBackground'
const { ipcRenderer } = require("electron");
const IsUseSysTitle = ref(false);
const isNotMac = ref(process.platform !== "darwin");
const IsWeb = ref(process.env.BUILD_TARGET);
const centerDialogVisible = ref(false)
const storeMarkdown = useStoreMarkdown()
const storeConfig = useStoreConfig()
const renderCheckIcon = () => h(CheckIcon);
let settingVisiable = ref(false)
let showEditorColor = ref(false)
const id = getHashParams('id')

const setTheme = (theme) => {
    storeConfig.setMarkdownTheme(theme)
}
const setMode = (mode) => {
    storeConfig.setMode(mode)
}
const setOutline = () => {
    storeConfig.setOutline(storeConfig.outline === '0' ? '1' : '0')
}
const setToolbar = () => {
    storeConfig.setToolbar(storeConfig.toolbar === '0' ? '1' : '0')
}
const openFile = () => {
    ipcRenderer.invoke("open-file").then(({ data, filePath } = {}) => {
        if (filePath) {
            updateHashParams('url', filePath)
            storeMarkdown.setMarkdownContent(data);
        }
    }).catch(e => {
        MessagePlugin.error(e.message || '未知错误')
    });
}
const createNewFile = () => {
    ipcRenderer.invoke("open-win", 'new').then((res) => {
        console.log(res);
    }).catch(e => {
        MessagePlugin.error(e.message || '未知错误')
    });
}
const openHelpWin = () => {
    ipcRenderer.invoke("open-win", 'help').then((res) => {
        console.log(res);
    }).catch(e => {
        MessagePlugin.error(e.message || '未知错误')
    });
}
const openDevtool = () => {
    const id = getHashParams('id')
    ipcRenderer.invoke("open-devtool", id).catch(e => {
        MessagePlugin.error(e.message || '未知错误')
    });
}
const openSetting = () => {
    settingVisiable.value = true
}
const handleEditorColorChange = (val) => {
    useSetEditorBackground(val)
    storeConfig.setBackground(val)
}
const resetEditorColor = () => {
    useSetEditorBackground('')
    storeConfig.setBackground('')
    showEditorColor.value = false
}

</script>
<style lang="less">
.t-popup__content {
    margin-top: 0 !important;
}
</style>
<style lang="less" scoped>
:deep(.t-divider--horizontal) {
    margin: 4px 0;
}

:deep(.t-color-picker__trigger) {
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 14px;

    &:hover {
        background-color: @hover-bg-color;
    }
}

.window-options {
    width: 100%;
    line-height: 1;
    background-color: #ffffff;
    display: flex;
    z-index: 99999;
    cursor: pointer;

    .option-item {
        padding: 4px 10px;
        border-radius: 5px;
        font-size: 14px;

        &:hover {
            background-color: @hover-bg-color;
        }
    }
}

.seat {
    height: 30px;
    position: relative;
}
</style>
