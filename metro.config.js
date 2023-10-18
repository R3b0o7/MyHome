/**
* Metro configuration for React Native
* https://github.com/facebook/react-native
*
* @format
*/
const {getDefaultConfig} = require('metro-config');
module.exports = (async () => {
const {
resolver: {sourceExts, assetExts},
} = await getDefaultConfig();
return {
transformer: {
babelTransformerPath: require.resolve('react-native-svg-transformer'),
},
//add extra resources types
resolver: {
assetExts: assetExts.filter(ext => ext !== 'svg'),
sourceExts: [...sourceExts, 'svg', 'webp', 'otf','ttf', 'pem'],
},
};
})();