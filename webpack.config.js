const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    /** Config file img **/
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    //config with file-loader
    .copyFiles({
        from: './assets/img',
        // main directory name
        to: 'img/[path][name].[ext]',
        // to import the file types I want and need
        pattern: /\.(png|jpg|jpeg|webp)$/
    })

    /**
     * ENTRY CONFIG
     * Each entry will result in one JavaScript file (e.g. app.js) and one CSS file (e.g. app.scss).
     */
    .addEntry('app', './assets/app.js')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    /**
     * FEATURE CONFIG
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    .enableSassLoader()
;

module.exports = Encore.getWebpackConfig();
