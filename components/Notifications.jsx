import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { getTranslation } from '../hooks/useLenguage';

export const Notificationss = ({ children }) => {

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 31) { // Android 12 (API 31) y superior
      requestExactAlarmPermission();
    }

    PushNotification.createChannel(
      {
        channelId: "carnitaAsada",
        channelName: "carnitaAsada",
        channelDescription: "A channel to categorise your notifications",
        playSound: true,
        soundName: "alarm_tone", 
        importance: PushNotification.Importance.HIGH,
        vibrate: true,
      }
    );

    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  const requestExactAlarmPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SCHEDULE_EXACT_ALARM,
        {
          title: getTranslation("permisos", 0),
          message: getTranslation("permisos", 1),
          buttonNeutral: getTranslation("permisos", 2),
          buttonNegative: getTranslation("permisos", 3),
          buttonPositive: getTranslation("permisos", 4)
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(getTranslation("permisos", 5), getTranslation("permisos", 6));
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const scheduleNotificationsHandler = () => {
    PushNotification.localNotification({
      channelId: "carnitaAsada",
      title: getTranslation('noti', 0),
      message: getTranslation('noti', 1),
      playSound: true,
      importance: PushNotification.Importance.HIGH,
      soundName: "default",
      actions: [getTranslation('noti', 4)],
      vibrate: true,
      vibration: 300,
      allowWhileIdle: true,
      invokeApp: true,
    });
  };

  const restEndNotifications = () => {
    PushNotification.localNotification({
      channelId: "carnitaAsada",
      title: getTranslation('noti', 2),
      message: getTranslation('noti', 3),
      playSound: true,
      soundName: "default",
      actions: ["Snooze", "Stop Alarm"],
      vibrate: true,
      importance: PushNotification.Importance.HIGH,
      vibration: 300,
      allowWhileIdle: true,
      invokeApp: true,
    });
  };

  return (
    <>
      {children({ scheduleNotificationsHandler, restEndNotifications })}
    </>
  );
};
