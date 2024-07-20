import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Slide } from './Slide.jsx';
import arrow from '../../assets/next.png';
import { PageIndex } from './PageIndex.jsx';

const { width } = Dimensions.get('window');

export const Slides = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [index, setIndex] = useState(0);
  const navigator = useNavigate();

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setIndex(currentIndex);
  };

  const scrollTo = () => {
    if (slidesRef.current && index < 2) { // cambiar de 3 a 2, ya que los índices van de 0 a 2 para tres slides
      slidesRef.current.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      navigator('/');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1c283a", alignItems: "center" }}>
      <ScrollView
        ref={slidesRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16} // Llama al listener aproximadamente cada 16ms (para un scroll más fluido)
      >
        <Slide slide={1} />
        <Slide slide={2} />
        <Slide slide={3} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <PageIndex slides={3} scrollX={scrollX} />
        <TouchableOpacity
          style={styles.button}
          onPress={scrollTo}
        >
          <Image source={arrow} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100
  },
  bottomBar: { 
    height: 150
  }
});
