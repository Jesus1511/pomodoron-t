import { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import { getTranslation } from '../hooks/useLenguage';

export const Notificationss = ({ children }) => {

  useEffect(() => {
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

  const scheduleNotificationsHandler = () => {
    PushNotification.localNotification({
      channelId: "carnitaAsada",
      title: getTranslation('noti',0),
      message:  getTranslation('noti',1),
      playSound: true,
      importance: PushNotification.Importance.HIGH,
      soundName: "default",
      actions: [getTranslation('noti', 4)],
      vibrate: true,
      vibration: 300,
      vibrate: true,
      allowWhileIdle: true,
      invokeApp: true,
    });
  };

  const restEndNotifications = () => {
    PushNotification.localNotification({
      channelId: "carnitaAsada",
      title:  getTranslation('noti',2),
      message:  getTranslation('noti',3),
      playSound: true,
      soundName: "default",
      actions: ["Snooze", "Stop Alarm"],
      vibrate: true,
      importance: PushNotification.Importance.HIGH,
      vibrate: true,
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


