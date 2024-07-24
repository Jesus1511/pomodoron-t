import { useState, createContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { getTranslation } from "../hooks/useLenguage";
import { useNavigate } from "react-router-native";

export const SettingsContext = createContext()

export const Settings = ({children}) => {

  const navigator = useNavigate()

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    await checkNotificationPermission();
    await checkBootPermission();
  };

  const checkNotificationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.VIBRATE);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available on this device/context');
          break;
        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          requestNotificationPermission();
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    } catch (error) {
      console.error('Error checking permission:', error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.VIBRATE);
      if (result === RESULTS.GRANTED) {
        Alert.alert('Permission Granted', 'You can now receive notifications with vibration.');
      } else {
        Alert.alert('Permission Denied', 'You cannot receive notifications with vibration.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  const checkBootPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.RECEIVE_BOOT_COMPLETED);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available on this device/context');
          break;
        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          requestBootPermission();
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    } catch (error) {
      console.error('Error checking permission:', error);
    }
  };

  const requestBootPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.RECEIVE_BOOT_COMPLETED);
      if (result === RESULTS.GRANTED) {
        Alert.alert('Permission Granted', 'You can now receive boot completed events.');
      } else {
        Alert.alert('Permission Denied', 'You cannot receive boot completed events.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

    const [name1, setName1] = useState()
    const [name2, setName2] = useState()
    const [color1, setColor1] = useState()
    const [color2, setColor2] = useState()
    const [varr, setVar] = useState()

    useEffect(() => {
      async function asyncUE () {
        const t = await AsyncStorage.getItem('firtsShot')
        if (t !== "s") {
          await AsyncStorage.setItem('name1',getTranslation("timer",0).toUpperCase())
          await AsyncStorage.setItem('name2',getTranslation("timer",1).toUpperCase())
          await AsyncStorage.setItem('color1','rgb(236, 100, 62)')
          await AsyncStorage.setItem('color2','rgb(97, 136, 235)')
          await AsyncStorage.setItem('tokens','2')
          await AsyncStorage.setItem('firtsShot','s')
          setVar(!varr)
          navigator('/slides')
        }
      }
      asyncUE()
    },[])

    useEffect(() => {
      async function setState() {
        if (await AsyncStorage.getItem('color2') !== null) {
          setName1(await AsyncStorage.getItem('name1'))
          setName2(await AsyncStorage.getItem('name2'))
          setColor1(await AsyncStorage.getItem('color1'))
          setColor2(await AsyncStorage.getItem('color2'))
        }
      }
      setState()
    },[varr])

    const [sesionStateChanged, setSesionStateChanged] = useState(false)

    return (
    <SettingsContext.Provider value={{name1, setName1, name2, setName2, color1, setColor1, color2, setColor2, sesionStateChanged, setSesionStateChanged}}>
        {children}
    </SettingsContext.Provider>
  )
}
