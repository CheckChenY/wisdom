const upurl = 'http://192.168.0.189:20012'
const url = 'http://192.168.0.189:5001/jtl/'
const webpack = require('webpack')
  
module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    // baseUrl: '/',
    // 输出文件目录
    outputDir: 'dist',
    runtimeCompiler: true, //关键点在这
    chainWebpack: (config) => {
        config.externals({
            "BMap": "BMap",
        })
        config.module
        .rule('swf')
        .test(/\.swf$/)
        .use('url-loader')
        .loader('url-loader')
        .tap(options => {
            return {
                limit: 10000
            }
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
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                prependData: `@import "~@/styles/variables.sass"`
            },
            // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
            // 因为 `scss` 语法在内部也是由 sass-loader 处理的
            // 但是在配置 `prependData` 选项的时候
            // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
            // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
            scss: {
                prependData: `@import "~@/styles/variables.scss";`
            },
            // 给 less-loader 传递 Less.js 相关选项
            less:{
                // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
                // `primary` is global variables fields name
                globalVars: {
                    primary: '#fff'
                }
            }
        }
    },
    //配置转发代理
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/upload': {
                target: upurl,
                ws: true,
                pathRewrite: {
                    '^/upload': '/'
                }
            },
            '/pub': {
                target: url + 'pub',
                // target:'http://192.168.0.155:20012',
                ws: true,
                pathRewrite: {
                    '^/pub': '/'
                }
            },
            '/auth': {
                target: url + 'auth',
                // target:'http://192.168.0.155:20011',
                ws: true,
                pathRewrite: {
                    '^/auth': '/'
                }
            },
            '/menu': {
                target: url + 'menu',
                // target:'http://192.168.0.155:20013',
                ws: true,
                pathRewrite: {
                    '^/menu': '/'
                }
            },
            '/pack': {
                target: url + 'pack',
                // target:'http://192.168.0.127:20015',
                ws: true,
                pathRewrite: {
                    '^/pack': '/'
                }
            },
            '/company': {
                target: url + 'company',
                // target:'http://192.168.0.155:20010',
                ws: true,
                pathRewrite: {
                    '^/company': '/'
                }
            },
            // '/dict': {
            //     target: url1,
            //     ws: true,
            //     pathRewrite: {
            //         '^/dict': '/'
            //     }
            // },
            '/device': {
                target:'http://192.168.0.155:20014',
                // target: url + 'device',
                ws: true,
                pathRewrite: {
                    '^/device': '/'
                }
            },
            '/camera': {
                // target: url + 'camera',
                target:'http://192.168.0.155:20016',
                ws: true,
                pathRewrite: {
                    '^/camera': '/'
                }
            },
            '/monitoring': {//监控中心
                target: url + 'monitoring',
                // target: 'http://192.168.0.127:20017/',
                ws: true,
                pathRewrite: {
                    '^/monitoring': '/'
                }
            },
            '/notice': {//通知中心
                target: url + 'notice',
                // target: 'http://192.168.0.155:20119',
                ws: true,
                pathRewrite: {
                    '^/notice': '/'
                }
            },
            '/set': {
                target: url + 'set',
                // target: 'http://192.168.0.155:20018',
                ws: true,
                pathRewrite: {
                    '^/set': '/'
                }
            },
            '/warn': {//警情
                // target: 'http://192.168.0.155:20019',
                target: url + 'alarm',
                ws: true,
                pathRewrite: {
                    '^/warn': '/'
                }
            },
            '/inspect': {//巡查
                // target:'http://192.168.0.155:20020/',
                target: url + 'safe',
                ws: true,
                pathRewrite: {
                    '^/inspect': '/'
                }
            },
            '/voice': {//语音合成
                target:'https://aip.baidubce.com/oauth/2.0',
                ws: true,
                pathRewrite: {
                    '^/voice': '/'
                }
            },
        }
    }
}