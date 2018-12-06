const proxySetting = require(paths.appPackageJson).proxy;

const proxyConfig = prepareProxy(proxySetting, paths.appPublic);

const serverConfig = createDevServerConfig(
    proxyConfig,
    urls.lanUrlForConfig
);

const devServer = new WebpackDevServer(compiler, serverConfig);
