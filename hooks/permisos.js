import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { getTranslation } from './useLenguage';

export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        getTranslation("permisos", 1), // Título de la alerta
        getTranslation("permisos", 4), // Mensaje explicando por qué es necesario el permiso
        [
          { text: getTranslation("permisos", 2), style: 'cancel' }, // Opción de cancelar
          {
            text: getTranslation("permisos", 3), // Opción de volver a solicitar
            onPress: async () => {
              granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
              );
            }
          },
          {
            text: getTranslation("permisos", 5), // Opción de ir a la configuración
            onPress: () => Linking.openSettings(),
          }
        ]
      );

      // Si el usuario selecciona "cancelar", rompes el bucle
      if (granted === PermissionsAndroid.RESULTS.DENIED) {return};
    }
  }
}

export async function requestExactAlarmPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    let alarmPermission = await PermissionsAndroid.request(
      'android.permission.SCHEDULE_EXACT_ALARM'
    );

    if (alarmPermission !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        "Exact Alarm Permission",
        "the application needs the exact alarms permission in order to work properly.", // Mensaje específico para la alarma exacta
        [
          { text: getTranslation("permisos", 2), style: 'cancel' },
          {
            text: getTranslation("permisos", 3),
            onPress: async () => {
              alarmPermission = await PermissionsAndroid.request(
                'android.permission.SCHEDULE_EXACT_ALARM'
              );
            }
          },
          {
            text: getTranslation("permisos", 5),
            onPress: () => Linking.openSettings(),
          }
        ]
      );

      if (alarmPermission === PermissionsAndroid.RESULTS.DENIED) {return};
    }

    return alarmPermission === PermissionsAndroid.RESULTS.GRANTED;
  } else {
    return true;
  }
}
