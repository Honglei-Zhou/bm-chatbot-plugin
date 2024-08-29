function BMPlugin(options) {
    // Configure your plugin with options...
}
BMPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation) {
        console.log('The compiler is starting a new compilation...')

        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            htmlPluginData.html += 'The magic footer'
            callback(null, htmlPluginData)
        })
    })
}

module.exports=BMPlugin