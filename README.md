**目前仅支持windows，mac后期可能会适配，目前处于alpha版本，会存在一些问题**

项目文档：[http://gitopenchina.gitee.io/wow-editor-doc/](http://gitopenchina.gitee.io/wow-editor-doc/)

**开发流程**

```js
# 安装依赖
npm config edit
# 该命令会打开npm的配置文件，请在空白处添加
# registry=https://registry.npmmirror.com
# ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
# ELECTRON_CUSTOM_DIR="{{ version }}"
# ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
# 然后关闭该窗口，重启命令行.
# 使用npm安装
npm i

# 启动之后，会在9080端口监听
npm run dev

# build命令在不同系统环境中，需要的的不一样，需要自己根据自身环境进行配置
npm run build
```
