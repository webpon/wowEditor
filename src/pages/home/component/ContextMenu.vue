<template>
    <t-dialog header="图片信息" v-model:visible="pictureVisible" @close="cancelNewPic" @confirm="handlerPictureModal">
        <t-form>
            <t-form-item label="地址" requiredMark>
                <t-input v-model.trim="pictureUrl" placeholder="请输入图片地址" />
                <FolderOpenIcon @click="selectImage" size="22px" class="open-file" />
            </t-form-item>
            <t-form-item label="标题">
                <t-input v-model="pictureTitle" placeholder="请输入图片标题" />
            </t-form-item>
        </t-form>
    </t-dialog>
</template>
  
<script lang='ts'>
let _this: any = {}
import { MessagePlugin } from 'tdesign-vue-next';
import { selectFile } from '@/node-ipc/fs'
import { FolderOpenIcon } from 'tdesign-icons-vue-next'

import { handleContextMenu } from './useContextMenu'
export default {
    data() {
        return {
            pictureVisible: false,
            pictureUrl: '',
            pictureTitle: '',
            vditor: {}
        }
    },
    components: {
        FolderOpenIcon
    },
    mounted() {
        _this = this
    },
    methods: {
        handleContext(e: MouseEvent, vditor) {
            handleContextMenu(e, vditor, _this)
        },
        handlerPictureModal() {
            const newImg: any = document.querySelector('img[alt="newimg"]')
            if (this.pictureUrl) {
                _this.pictureVisible = false
                newImg.src = this.pictureUrl
                newImg.alt = this.pictureTitle
                this.pictureUrl = ''
                this.pictureTitle = ''
            } else {
                MessagePlugin.warning({ content: '图片url是必须的', duration: 1000 })
            }
        },
        cancelNewPic() {
            try {
                this.pictureUrl = ''
                this.pictureTitle = ''
                const newImg = document.querySelector('img[alt="newimg"]')
                newImg.parentNode?.removeChild(newImg)
            } catch (error) {
                MessagePlugin.warning({ content: '未知错误', duration: 1000 })
            }
        },
        async selectImage() {
            const filePaths = await selectFile(['jpg', 'png', 'gif', 'bmp', 'svg', 'ico'])
            this.pictureUrl = filePaths[0]
        }
    }
}
</script>
  
<style scoped lang="less">
.open-file {
    position: absolute;
    right: 10px;
    z-index: 1000;
    cursor: pointer;

    &:hover {
        color: blue;
    }
}
</style>

