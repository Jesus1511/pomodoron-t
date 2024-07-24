import { useState, useEffect, createContext, useMemo, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cleanStorageState, setSesion, useStateStorage } from '../hooks/storage'
import {SettingsContext} from './Settings'
import BackgroundTimer from 'react-native-background-timer'
import { useNavigate } from 'react-router-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { getTranslation } from '../hooks/useLenguage';

export const TimerContext = createContext();
export const AdmobContext = createContext()

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8277191048630504/1547346654';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fitness', 'habits', 'productivity', 'selfinprovement'],
});

export const Timer = ({ children, scheduleNotificationsHandler, restEndNotifications }) => {

  const {setSesionStateChanged} = useContext(SettingsContext)

  const [isRegistered, setIsRegistered] = useState(null);
  const [timerState, setTimerState] = useState(1);
  const [workingTime, setWorkingTime] = useState(0);
  const [restingTime, setRestingTime] = useState(0);
  const [startSesionDate, setStartSesionDate] = useState(null);

  const [sesionMaxTime, setSesionMaxTime] = useState(0);
  const [restBudgeting, setRestBudgeting] = useState(0);

  const [loaded, setLoaded] = useState(false);
  const [tokens, setTokens] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    cargarAnuncio()
    setiandingTokens()
  },[])

  function cargarAnuncio () {

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log("Rewarded ad loaded");
      setLoaded(true);
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async reward => {
      await rewardUser();
    });

    console.log("Loading rewarded ad...");
    rewarded.load()

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }
  async function setiandingTokens () {
    const storedTokens = await AsyncStorage.getItem('tokens')
    if (storedTokens == NaN) {
      setTimeout(async ()=> {
        storedTokens = await AsyncStorage.getItem('tokens')
      },500)
    }
    setTokens(parseInt(storedTokens))
  }

  const rewardUser = async () => {
    const storedTokens = await AsyncStorage.getItem('tokens');
    const newTokens = (parseInt(storedTokens) || 0) + 1;
    setTokens(newTokens)
    await AsyncStorage.setItem('tokens', newTokens.toString());
    navigator('/');
    setLoaded(false);
    cargarAnuncio()
  };

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
        BackgroundTimer.stopBackgroundTimer()
        BackgroundTimer.runBackgroundTimer(() => {
          setWorkingTime(secs => secs+1)
        },1000)
      }
      else if (timerState == 2) {
        BackgroundTimer.stopBackgroundTimer()
        BackgroundTimer.runBackgroundTimer(() => {
          setRestingTime(secs => secs+1)
        },1000)
      }
    } else {BackgroundTimer.stopBackgroundTimer()}
  }, [isRegistered, timerState, tokens]);


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
    const newTokens = tokens-1
    await AsyncStorage.setItem('tokens', newTokens.toString())
    setTokens(newTokens)
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
    if (tokens <= 0) {
      alert(getTranslation("timer", 7))
      return
    }
    if (isRegistered) {
      endSesion();
    } else {
      startSesion()
    }
  };

  const contextValue = useMemo(() => ({
    tokens,
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
      <AdmobContext.Provider value={{loaded, setLoaded, rewarded}}>
        {children}
      </AdmobContext.Provider>
    </TimerContext.Provider>
  );
};
