var publicPath = 'dist/dev/desktop/'
var prefix = '/dev/desktop/'
var stage = 'prod'
// process.env.BOT_STAGE = '"dev"'

if(stage === 'prod' ){
    publicPath = 'dist/v1/desktop/'
    prefix = '/v1/desktop/'
}else if (stage === 'test'){
    publicPath = 'dist/'
    prefix = '/'
}

module.exports = {
    publicPath: publicPath,
    prefix: prefix,
    stage: '"prod"'
}