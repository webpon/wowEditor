<template>
    <div>
        <t-drawer :footer="false" v-model:visible="props.visiable" size="100%" placement="top">
            <div class="setting-container">
                <div class="setting-header">
                    <div class="container">
                        <p class="title">偏好设置</p>
                        <CloseIcon class="close-btn" name="close" size="30px" @click="$emit('close')" />
                    </div>
                </div>
                <div class="setting-content">
                    <t-tabs placement="left" class="" :default-value="1">
                        <t-tab-panel label="通用" :value="1">
                            <t-form ref="ruleFormRef" labelAlign="left" label-width="150px">
                                <t-form-item label="自动保存">
                                    <t-switch size="large" :value="storeConfig.autoSave === '1'"
                                        @change="setAutoSave" />
                                </t-form-item>
                                <t-form-item label="更新">
                                    <t-button theme="default" @click="checkUpdate">检查更新</t-button>
                                </t-form-item>
                            </t-form>
                        </t-tab-panel>
                        <t-tab-panel label="外观" :value="2">
                            <t-form ref="ruleFormRef" labelAlign="left" label-width="150px">
                                <t-form-item label="隐藏侧边栏">
                                    <t-switch size="large" :value="storeConfig.outline === '0'" @change="setOutline" />
                                </t-form-item>
                                <t-form-item label="隐藏工具栏">
                                    <t-switch size="large" :value="storeConfig.toolbar === '0'" @change="setToolbar" />
                                </t-form-item>
                                <t-form-item label="夜间模式">
                                    <t-switch size="large" />
                                </t-form-item>
                                <t-form-item label="编辑器模式">
                                    <t-select bordered style="width: 200px;" @change="setMode"
                                        :value="storeConfig.mode">
                                        <t-option key="wysiwyg" label="所见即所得" value="wysiwyg" />
                                        <t-option key="ir" label="即时渲染" value="ir" />
                                        <t-option key="sv" label="分屏预览" value="sv" />
                                    </t-select>
                                </t-form-item>
                                <t-form-item label="主题">
                                    <t-select bordered style="width: 200px;" @change="setTheme"
                                        :value="storeConfig.markdownTheme">
                                        <t-option key="ant-design" label="ant-design" value="ant-design" />
                                        <t-option key="dark" label="dark" value="dark" />
                                        <t-option key="light" label="light" value="light" />
                                        <t-option key="wechat" label="wechat" value="wechat" />
                                        <t-option key="purple" label="purple" value="purple" />
                                    </t-select>
                                </t-form-item>
                            </t-form>
                        </t-tab-panel>
                        <t-tab-panel label="编辑器" :value="3">
                            <t-form ref="ruleFormRef" labelAlign="left" label-width="150px">
                                <t-form-item label="新文件使用默认值">
                                    <t-switch size="large" :value="storeConfig.useInitValue === '1'"
                                        @change="storeConfig.setUseInitValue(storeConfig.useInitValue === '0' ? '1' : '0')" />
                                </t-form-item>
                                <t-form-item label="编辑器默认值">
                                    <t-textarea :autosize="{ minRows: 4, maxRows: 6 }" placeholder="请输入内容"
                                        :value="storeConfig.initValue" @change="(e) => storeConfig.setInitValue(e)" />
                                </t-form-item>
                            </t-form>
                        </t-tab-panel>
                        <t-tab-panel label="导出" :value="4">导出</t-tab-panel>
                    </t-tabs>
                </div>
            </div>
        </t-drawer>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { MessagePlugin } from 'tdesign-vue-next';
import { CloseIcon } from 'tdesign-icons-vue-next'

import useStoreConfig from "@/store/modules/config";
const storeConfig = useStoreConfig()
interface TProps {
    visiable: boolean;
}
const props = withDefaults(
    defineProps<TProps>(), {
    visiable: false,
}
);
// 多个来源组成的数组
watch(() => props.visiable, (newV) => {
    console.log(newV)
})

const setAutoSave = (val) => { storeConfig.setAutoSave(val ? '1' : '0') }

// 检查更新
const checkUpdate = () => {
    setTimeout(() => {
        MessagePlugin.info('暂无更新!', 1000)
    }, 800)
}
const setOutline = () => {
    storeConfig.setOutline(storeConfig.outline === '0' ? '1' : '0')
}
const setToolbar = () => {
    storeConfig.setToolbar(storeConfig.toolbar === '0' ? '1' : '0')
}

// 设置主题
const setTheme = (theme) => {
    storeConfig.setMarkdownTheme(theme)
}
// 设置编辑模式
const setMode = (mode) => {
    storeConfig.setMode(mode)
}
</script>
<style lang="less" scoped>
:deep(.t-drawer--top) {
    top: 24px;
}

:deep(.t-drawer__body) {
    padding: 0;
    margin: 0;
}

:deep(.t-tabs__content) {
    padding: 14px 150px 14px 100px;
}

:deep(.t-popup__content) {
    width: 200px !important;
}

.setting-container {
    margin: 0 auto;

    .setting-content {
        max-width: 1200px;
        margin: 0 auto;
        padding-top: 43px;
    }

    .setting-header {
        height: 56px;
        box-shadow: 0 1px 0 rgb(12 13 14 / 8%), 0 1px 3px rgb(12 13 14 / 8%), 0 4px 20px rgb(12 13 14 / 4%), 0 1px 1px rgb(12 13 14 / 3%);

        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            flex: 1;
        }

        .title {
            font-size: 18px;
            flex: 1;
            line-height: 56px;
            margin: 0;
            text-indent: 10px;
            font-weight: 600;
        }

        .close-btn {
            cursor: pointer;
            padding: 3px;
            border-radius: 7px;

            &:hover {
                background-color: @hover-bg-color;
            }
        }
    }
}
</style>