module.exports = (isDev) => {
    return {
        // vue解析的时候去掉空格
        preserveWhitespace: true,
        //vue中的样式单独打包
        //vue中style异步加载，没必要一下子全部加载，需要显示的时候加载
        extractCSS: isDev
    }
}
