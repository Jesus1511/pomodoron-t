import { useState, useEffect, createContext, useMemo, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cleanStorageState, setSesion, useStateStorage, cleanStorageSesions } from '../hooks/storage'
import {SettingsContext} from './Settings'
import BackgroundTimer from 'react-native-background-timer'

export const TimerContext = createContext();

export const Timer = ({ children, scheduleNotificationsHandler, restEndNotifications }) => {



  const {setSesionStateChanged} = useContext(SettingsContext)

  const [isRegistered, setIsRegistered] = useState(null);
  const [timerState, setTimerState] = useState(1);
  const [workingTime, setWorkingTime] = useState(0);
  const [restingTime, setRestingTime] = useState(0);
  const [startSesionDate, setStartSesionDate] = useState(null);

  const [sesionMaxTime, setSesionMaxTime] = useState(0);
  const [restBudgeting, setRestBudgeting] = useState(0);


  useEffect(() => {
    async function asyncUseEffect() {
      const { storedSesionMaxTime, storedRestBudgeting, storedTimerState, storedRegistered, storedWorkingTime, storedRestingTime, startSesionDate } = await useStateStorage();
      setIsRegistered(storedRegistered);
      if (storedRegistered) {
        setTimerState(storedTimerState);
        setWorkingTime(storedWorkingTime);
        setRestingTime(storedRestingTime);
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

    if (isRegistered) {
      if (timerState == 1) {
        console.log("state: 1")
        BackgroundTimer.stopBackgroundTimer()
        BackgroundTimer.runBackgroundTimer(() => {
          setWorkingTime(secs => secs+1)
        },1000)
      }
      else if (timerState == 2) {
        console.log("state: 2")
        BackgroundTimer.stopBackgroundTimer()
        BackgroundTimer.runBackgroundTimer(() => {
          setRestingTime(secs => secs+1)
        },1000)
      }
    } else {BackgroundTimer.stopBackgroundTimer()}
  }, [isRegistered, timerState]);


  useEffect(() => {
    if (isRegistered) {
      if ((workingTime + restingTime) >= sesionMaxTime && sesionMaxTime !== 0) {
        BackgroundTimer.stopBackgroundTimer()
        scheduleNotificationsHandler()
        endSesion();
      }
      if (restingTime >= restBudgeting && restBudgeting !== 0 && timerState !== 1) {
        restEndNotifications()
        setTimerState(1);
      }
    } else {BackgroundTimer.stopBackgroundTimer()}

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



  async function startSesion() {
    setStartSesionDate(Date.now());
    await AsyncStorage.setItem('startSesionDate', Date.now().toString());
    setIsRegistered(true);
    setTimerState(1)
  }

  async function endSesion() {
    if (workingTime + restingTime > 0 && isRegistered) {
      await setSesion({ workingTime, restingTime, startSesionDate, finishSesionDate: Date.now() });
    }
    BackgroundTimer.stopBackgroundTimer()
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
    if (isRegistered) {
      endSesion();
    } else {
      startSesion()
    }
  };

  const contextValue = useMemo(() => ({
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
