// v1.5.0+ 版本
const { PicGo } = require('picgo')
const picgo = new PicGo() // 将使用默认的配置文件：~/.picgo/config.json
console.log(picgo.getConfig());
picgo.setConfig(
    {
        "picBed": {
          "uploader": "github", 
          "current": "github",
          "github": {
            "repo": "webpon-static-store/static-store", 
            "token": "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",
            "path": "img/",
            "customUrl": "https://cdn.jsdelivr.net/gh/webpon-static-store/static-store", 
            "branch": "main" 
          }
        },
        "picgoPlugins": {}
      }
)
// // 上传具体路径下的图片
export const uploadImg = (imgSrc) => {
    return picgo.upload([imgSrc])
}
// 上传剪贴板里的第一张图片（上传时会将格式转为png）
// picgo.upload()