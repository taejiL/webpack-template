const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = (env, options) => {
    console.log(env, options)
    return {
        resolve: {
            extensions: ['.js'], //확장자
            alias: {//별칭
                '~': path.resolve(__dirname,'src') // node.js내장 API  __dirname:주변
            } 
        },
        entry: './src/main.js',
        output: {
            // path: '',
            //filename:'',
            publicPath: '/',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/, //정규 표현식 .js .은 기능
                    exclude: /node_modules/, // 정규식을 시작하고 끝맺는 /  
                    use: 'babel-loader'
                },
                {
                    test: /\.s?css$/, // scss로 끝나는 이름 $
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',//공급업체 제조사를 붙여준다.
                        'sass-loader'//css전(pre)처리기(processor): 전처리 도구 
                    ]
                }
            ]
        },
        plugins: [
            new HtmlPlugin({
                template: './src/index.html'
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'static'}
                ]
            })
        ],
        devserver: {
            port: 8080,
            open: true, // 자동 오픈
            historyApiFallback: true
        }   
    }
}