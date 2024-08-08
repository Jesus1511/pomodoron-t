import { PermissionsAndroid, Platform } from 'react-native';
import { getTranslation } from './useLenguage';

export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        alert(getTranslation("permisos",4))
        return
    }
  }
}
