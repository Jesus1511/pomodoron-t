import { useState, useEffect, useContext } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-native'
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { getTranslation } from '../../hooks/useLenguage';
import { TimerContext } from '../Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8277191048630504/1547346654';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fitness', 'habits', 'productivity', 'selfinprovement'],
});

const Adsense = () => {
  const [loaded, setLoaded] = useState(false);
  const navigator = useNavigate();
  const {setTokens} = useContext(TimerContext)

  useEffect(() => {
    cargarAnuncio()
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

  const rewardUser = async () => {
    const storedTokens = await AsyncStorage.getItem('tokens');
    const newTokens = (parseInt(storedTokens) || 0) + 1;
    await AsyncStorage.setItem('tokens', newTokens.toString());
    setTokens(newTokens)
    navigator('/');
    setLoaded(false);
  };

  useEffect(() => {
    if (loaded) {
      rewarded.show()
    }
  },[loaded])

  if (loaded) {
    return (
      <>
      </>
    )
  } else {
    return (
      <View style={{flex:1, backgroundColor:"#1a2432"}}>
        <TouchableOpacity onPress={ () =>{navigator("/")}} style={styles.shadow}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{color:"white"}}>{getTranslation('menu', 4)}</Text>
        </TouchableOpacity>
      </View>

    )
  }
}

export default Adsense

const styles = StyleSheet.create({
  textos: {
    fontSize: 18,
    marginBottom: 30,
    color: 'white',
  },
  shadow: {
    backgroundColor: "#00000079",
    position: "absolute",
    flex:1,
    width,
    height,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});