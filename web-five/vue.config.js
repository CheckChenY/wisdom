// 192.168.0.20  192.168.0.61 192.168.0.188
const unitUrl = "http://192.168.0.188:8001"
const authUrl = "http://192.168.0.188:8003"
// const unitUrl = "http://47.105.104.28:60001"
// const authUrl = "http://47.105.104.28:60003"

const webpack = require('webpack')

module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    // baseUrl: '/',
    // 输出文件目录
    outputDir: 'dist_unit',
    runtimeCompiler: true, //关键点在这
    chainWebpack: (config) => {
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
            "BMap": "BMap",
        })
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    transpileDependencies: ['avue-plugin-transfer', 'avue-plugin-ueditor'],
    //配置转发代理
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8050,
        https: false,
        hotOnly: false,
        proxy: {
            '/auth': { // 权限服务
                target: authUrl,
                ws: true,
                pathRewrite: {
                    '^/auth': '/'
                }
            },
            '/unit': { // 社会单位服务
                target: unitUrl,
                ws: true,
                pathRewrite: {
                    '^/unit': '/'
                }
            }
        }
    }
}