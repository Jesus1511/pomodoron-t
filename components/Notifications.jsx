import { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import { getTranslation } from '../hooks/useLenguage';

export const Notificationss = ({ children }) => {

 useEffect(() => {
 //   PushNotification.createChannel(
 //     {
 //       channelId: "carnitaAsada",
 //       channelName: "carnitaAsada",
 //       channelDescription: "A channel to categorise your notifications",
 //       playSound: true,
 //       soundName: "endsesion", 
 //       importance: PushNotification.Importance.HIGH,
 //       vibrate: true,
 //     },
 //     (created) => console.log(`createChannel returned '${created}'`) 
 //   );

    // Configuración inicial de PushNotification
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
      priority: "high",
      importance: "high", 
      soundName: 'endsesion', 
      vibrate: true,
      vibration: 600,
    });
  };

  const restEndNotifications = () => {
    PushNotification.localNotification({
      channelId: "carnitaAsada",
      title:  getTranslation('noti',2),
      message:  getTranslation('noti',3),
      playSound: true,
      soundName: 'endsesion',
      vibrate: true,
      vibration: 600,
    });
  };

  return (
    <>
      {children({ scheduleNotificationsHandler, restEndNotifications })}
    </>
  );
};


