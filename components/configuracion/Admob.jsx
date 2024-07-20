import { Text, TouchableOpacity, StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import { getTranslation } from '../../hooks/useLenguage';
import { useEffect, useState, useTransition } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8412527947101695/9215113958';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fitness', 'habits', 'selfimprovement', 'work'],
});

const { width, height } = Dimensions.get('window');

export const Admob = () => {
  const [loaded, setLoaded] = useState(false);
  const [opening, setOpening] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    loadAd();
  }, []);

  const loadAd = () => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      rewardUser();
    });

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

  const rewardUser = async () => {
    setOpening(false);
    const tokens = await AsyncStorage.getItem('tokens');
    const newTokens = (parseInt(tokens) || 0) + 1;
    await AsyncStorage.setItem('tokens', newTokens.toString());
  };

  return (
    <>
      <TouchableOpacity onPress={() => startTransition(() => setOpening(true))}>
        <Text style={styles.textos}>{getTranslation('menu', 1)}</Text>
      </TouchableOpacity>
      {opening && (
        <>
          {loaded ? (
            rewarded.show()
          ) : (
            <TouchableOpacity onPress={() => setOpening(false)} style={styles.shadow}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text>{getTranslation('menu', 4)}</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textos: {
    fontSize: 18,
    marginBottom: 30,
    color: 'white',
  },
  shadow: {
    backgroundColor: "#00000079",
    position: "absolute",
    width: "115%",
    height,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
