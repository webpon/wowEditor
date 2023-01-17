<template>
    <div>
        <t-dialog :header="false" :footer="false" :visible="props.visiable" title="关于" width="400px" @close="$emit('close')">
            <div class="container">
                <div class="about">
                    <img src="/favicon.ico" style="width: 80px;">
                    <p class="name">wowEditor</p>
                    <p>欢迎使用</p>
                </div>
                <div class="desc">
                    <ul>
                        <li class="desc-item border">
                            <div class="label">
                                版本
                            </div>
                            <div class="content">
                                1.0.0(alpha版本)
                            </div>
                        </li>
                        <li class="desc-item border">
                            <div class="label">
                                作者
                            </div>
                            <div class="content">
                                webpon
                            </div>
                        </li>
                        <li class="desc-item border">
                            <div class="label">
                                邮箱
                            </div>
                            <div class="content">
                                2249096563@qq.com
                            </div>
                        </li>
                        <li class="desc-item">
                            <div class="label">
                                微信
                            </div>
                            <div class="content">
                                wx2249096563
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </t-dialog>
    </div>
</template>
  
<script setup lang='ts'>
interface TProps {
    visiable: boolean;
}
const props = withDefaults(
    defineProps<TProps>(), {
    visiable: false,
})

</script>
  
<style scoped lang="less">
:deep(.t-dialog) {
    background-image: linear-gradient(to bottom, #fff 0%, rgba(#276ace, 0.3) 100%);
}

.about {
    display: flex;
    align-items: center;
    flex-direction: column;

    .text-wrap {
        margin-left: 40px;
    }

    .name {
        font-weight: bold;
    }
}

.desc {
    border-radius: 12px;
    overflow: hidden;

    ul {
        padding: 0;
    }

    .desc-item {
        list-style: none;
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        background-color: rgba(255, 255, 255, 0.5);

        .label {
            font-size: 13px;
            font-weight: 400;
            font-weight: 600;
        }

        .content {
            font-size: 13px;
            font-weight: 400;
        }
    }

    .border {
        border-bottom: 1px solid #ddd;
    }
}
</style>