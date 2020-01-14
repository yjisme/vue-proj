module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: 'http://localhost:9527'
            },
            "/imgs": {
                target: 'http://localhost:9527'
            }
        }
    },
    outputDir: "../server/public"
}