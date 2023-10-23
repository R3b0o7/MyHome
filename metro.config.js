const { getDefaultConfig } = require('metro-config');
const path = require('path');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg', 'webp', 'otf', 'ttf', 'pem'],
    },
    watchFolders: [
      path.resolve(__dirname, 'app/assets/fonts'), // Ruta relativa a tu metro.config.js
    ],
  };
})();
