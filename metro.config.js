const { getDefaultConfig } = require('@expo/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Aquí puedes agregar cualquier configuración personalizada adicional

  return config;
})();



// const { getDefaultConfig: getExpoDefaultConfig } = require('@expo/metro-config');
// const { getDefaultConfig: getRNDefaultConfig } = require('@react-native/metro-config');
// const { mergeConfig } = require('metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// module.exports = (async () => {
//   const expoConfig = await getExpoDefaultConfig(__dirname);
//   const rnConfig = await getRNDefaultConfig(__dirname);

//   return mergeConfig(expoConfig, rnConfig);
// })();
