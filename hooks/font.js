import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'MS': require('../assets/fonts/MS.ttf')
  });
  return
};
