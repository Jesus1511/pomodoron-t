import { useContext } from 'react';
import { SettingsContext } from '../Settings.jsx';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

export const CirclePorcent = ({ theres1, theres2, children }) => {
  const { color1, color2 } = useContext(SettingsContext);

  const size = 150;
  const radius = size / 2 - 20;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;

  const progress1 = theres1 / 100;
  const progress2 = theres2 / 100;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.miniBar} />
      <Svg height={size} width={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Fondo del círculo completo */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color1}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Parte roja del círculo */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color1}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference * progress1}, ${circumference}`}
            strokeLinecap="round"
          />
          {/* Parte azul del círculo */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color2}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference * progress2}, ${circumference}`}
            strokeDashoffset={-circumference * progress1}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniBar: {
    backgroundColor: "#ffffff",
    width: 3,
    height: 25,
    position: "absolute",
    top: 10,
    zIndex: 99,
  },
});
