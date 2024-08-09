import { useState, useEffect, createContext, useMemo, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cleanStorageState, setSesion, useStateStorage } from '../hooks/storage'
import { SettingsContext } from './Settings'
import { getTranslation } from '../hooks/useLenguage';
import PushNotification from 'react-native-push-notification';
import {AppState} from 'react-native'

export const TimerContext = createContext();

export const Timer = ({ children, scheduleNotificationsHandler, restEndNotifications, workingTimeNotification, restingTimeNotification }) => {

  const [appState, setAppState] = useState(AppState.currentState);
  const {setSesionStateChanged} = useContext(SettingsContext)

  const [isRegistered, setIsRegistered] = useState(null);
  const [timerState, setTimerState] = useState(1);
  const [workingTime, setWorkingTime] = useState(0);
  const [restingTime, setRestingTime] = useState(0);
  const [startSesionDate, setStartSesionDate] = useState(null);

  const [sesionMaxTime, setSesionMaxTime] = useState(0);
  const [restBudgeting, setRestBudgeting] = useState(0);

  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {

        const lastSeconds = parseInt(await AsyncStorage.getItem('outDate'))
        const storedWorkingTime = parseInt(await AsyncStorage.getItem('workingTime'))
        const storedRestingTime = parseInt(await AsyncStorage.getItem('restingTime'))
        const milliseconds = Date.now();
        const seconds = Math.floor(milliseconds / 1000);

        if (isRegistered && timerState == 1) {

          const finalWorkingTime = storedWorkingTime + (seconds-lastSeconds)
          if ((finalWorkingTime+storedRestingTime) >= sesionMaxTime) {
            setWorkingTime(sesionMaxTime-storedRestingTime)
          } else {
            setWorkingTime(finalWorkingTime)
          }
          setRestingTime(storedRestingTime)
        }
        if (isRegistered && timerState == 2) {

          const finalRestingTime = storedRestingTime + (seconds-lastSeconds)
          if (finalRestingTime >= restBudgeting) {
            setRestingTime(restBudgeting)
            setWorkingTime(storedWorkingTime + (finalRestingTime - restBudgeting))
          } else {
            setRestingTime(finalRestingTime)
            setWorkingTime(storedWorkingTime)
          }
        }

      } else if (nextAppState.match(/inactive|background/)) {

        const milliseconds = Date.now();
        const seconds = Math.floor(milliseconds / 1000);
        await AsyncStorage.setItem('outDate',seconds.toString())
        await AsyncStorage.setItem('workingTime', workingTime.toString());
        await AsyncStorage.setItem('restingTime', restingTime.toString());
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);

  async function setiandingTokens () {
    let storedTokens = await AsyncStorage.getItem('tokens')
    if (storedTokens == NaN) {
      setTimeout(async ()=> {
        storedTokens = await AsyncStorage.getItem('tokens')
      },500)
    }
    setTokens(parseInt(storedTokens))
  }

  useEffect(() => {
    setiandingTokens()
    async function asyncUseEffect() {
      const { storedSesionMaxTime, storedRestBudgeting, storedTimerState, storedRegistered, startSesionDate } = await useStateStorage();
      setIsRegistered(storedRegistered);
      if (storedRegistered) {
        setTimerState(storedTimerState);
        setStartSesionDate(startSesionDate);
        setSesionMaxTime(storedSesionMaxTime);
        setRestBudgeting(storedRestBudgeting);
      }
    }
    asyncUseEffect();
  }, []);

  async function updateStorage() {
    await AsyncStorage.setItem('timerState', timerState.toString());
    await AsyncStorage.setItem('registered', isRegistered.toString());
  };

  useEffect(() => {
    if (isRegistered !== null && timerState !== null) {
      updateStorage();
    }
    let intervalId;

    if (isRegistered) {
      if (timerState === 1) {
        scheduleNotificationsHandler(new Date(Date.now() + (sesionMaxTime - (workingTime+restingTime)) * 1000))
        PushNotification.cancelLocalNotification('2');
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          setWorkingTime((secs) => secs + 1);
        }, 1000);
      } else if (timerState === 2) {
        restEndNotifications(new Date(Date.now() + (restBudgeting-restingTime) * 1000))
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          setRestingTime((secs) => secs + 1);
        }, 1000);
      }
    } else {clearInterval(intervalId)}
    return () => clearInterval(intervalId);
  }, [isRegistered, timerState, tokens]);


  useEffect(() => {
    if (isRegistered) {
      if ((workingTime + restingTime) >= sesionMaxTime && sesionMaxTime !== 0) {
        endSesion();
      }
      if (restingTime >= restBudgeting && restBudgeting !== 0 && timerState !== 1) {
        setTimerState(1);
      }
    }

    const updateAsyncStorage = async () => {
      try {
        if (workingTime !== null && timerState === 1) {
          await AsyncStorage.setItem('workingTime', workingTime.toString());
        }
        if (restingTime !== null && timerState === 2) {
          await AsyncStorage.setItem('restingTime', restingTime.toString());
        }
      } catch (error) {
        console.error("Error setting the timer in AsyncStorage", error);
      }
    };
    updateAsyncStorage();
  }, [workingTime, restingTime, sesionMaxTime]);

  useEffect(() => {
    if (sesionMaxTime !== 0) {
      scheduleNotificationsHandler(new Date(Date.now() + sesionMaxTime * 1000))
    }
  },[sesionMaxTime])


  async function startSesion() {
    const storedTokens = await AsyncStorage.getItem('tokens')
    const newTokens = (parseInt(storedTokens) || 0) - 1;
    await AsyncStorage.setItem('tokens', newTokens.toString())
    setStartSesionDate(Date.now());
    await AsyncStorage.setItem('startSesionDate', Date.now().toString());
    setIsRegistered(true);
    setTimerState(1)

  }

  async function endSesion() {
    if (workingTime + restingTime > 0 && isRegistered) {
      await setSesion({ workingTime, restingTime, startSesionDate, finishSesionDate: Date.now() });
    }
    setIsRegistered(false);
    setSesionStateChanged((prev) => {return !prev})
    await cleanStorageState();
    setWorkingTime(0);
    setRestingTime(0);
    setTimerState(1)
    setSesionMaxTime(0);
    setRestBudgeting(0);
  }


  const handleDay = async () => {
    if (tokens <= 0) {
      alert(getTranslation("timer", 7))
      return
    }
    if (isRegistered) {
      PushNotification.cancelLocalNotification('1')
      PushNotification.cancelLocalNotification('2')
      endSesion();
    } else {
      startSesion()
    }
  };


  const contextValue = useMemo(() => ({
    tokens,
    setTokens,
    sesionMaxTime,
    setSesionMaxTime,
    restBudgeting,
    setRestBudgeting,
    handleDay,
    timerState,
    setTimerState,
    isRegistered,
    workingTime,
    restingTime
  }), [
    tokens,
    sesionMaxTime,
    restBudgeting,
    timerState,
    isRegistered,
    workingTime,
    restingTime
  ]);

  return (
    <TimerContext.Provider value={contextValue}>
        {children}
    </TimerContext.Provider>
  );
};
