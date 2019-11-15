module.exports = {
  pwa: {
    name: 'Idean book',
    themeColor: '#ffffff',
    backgroundColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
    },
  },
};
