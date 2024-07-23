import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-8412527947101695/6081989040';

const Banner = () => {

    const bannerRef = useRef<BannerAd>(null);

    useForeground(() => {
      Platform.OS === 'ios' && bannerRef.current?.load();
    })

  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        networkExtras: {
          collapsible: 'bottom',
        },
      }}
    />
  )
}

export default Banner

