import { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import { getTranslation } from '../hooks/useLenguage';
import { Platform } from 'react-native';
import { formatTime } from '../hooks/traductor';

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

    PushNotification.createChannel(
      {
        channelId: "currentTimers",
        channelName: "currentTimers",
        channelDescription: "",
        playSound: false, 
        importance: PushNotification.Importance.HIGH,
        vibrate: false,
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

  const scheduleNotificationsHandler = (date) => {
    PushNotification.localNotificationSchedule({
      id: 1,
      channelId: "carnitaAsada",
      title: getTranslation('noti', 0),
      message: getTranslation('noti', 1),
      playSound: true,
      importance: PushNotification.Importance.HIGH,
      soundName: "default",
      actions: [getTranslation('noti', 4)],
      vibrate: true,
      vibration: 300,
      date: date,
      allowWhileIdle: true,
      invokeApp: true,
    });
  };

  const restEndNotifications = (date) => {
    PushNotification.localNotificationSchedule({
      id: 2,
      channelId: "carnitaAsada",
      title: getTranslation('noti', 2),
      message: getTranslation('noti', 3),
      playSound: true,
      soundName: "default",
      actions: ["Snooze", "Stop Alarm"],
      vibrate: true,
      date: date,
      importance: PushNotification.Importance.HIGH,
      vibration: 300,
      allowWhileIdle: true,
      invokeApp: true,
    });
  };

  const workingTimeNotification = (workingTime) => {
    PushNotification.localNotification({
      id: "1234",
      channelId: "currentTimers",
      title: getTranslation('noti', 5),
      message: formatTime(workingTime),
      importance: PushNotification.Importance.HIGH,
      allowWhileIdle: true,
      invokeApp: true,
      ongoing: true,
    });
  };

  const restingTimeNotification = (restBudgeting) => {
    PushNotification.localNotification({
      id: "12345",
      channelId: "currentTimers",
      title: getTranslation('noti', 6),
      message: formatTime(restBudgeting),
      importance: PushNotification.Importance.HIGH,
      allowWhileIdle: true,
      invokeApp: true,
      ongoing: true,
    });
  };


  return (
    <>
      {children({ scheduleNotificationsHandler, restEndNotifications, workingTimeNotification, restingTimeNotification })}
    </>
  );
};
