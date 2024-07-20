import { useContext } from 'react';
import { SettingsContext } from '../Settings.jsx';
import { TimerContext } from '../Timer';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

export const Circulo = ({ value, children }) => {
  const { timerState, restBudgeting, restingTime, sesionMaxTime } = useContext(TimerContext);
  const { color1, color2 } = useContext(SettingsContext);

  const work = sesionMaxTime - restingTime + 1;

  const size = 350;
  const radius = size / 2 - 20;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const adjustedValue = value % 3600;

  let progress;
  if (timerState === 1) {
    progress = Math.min(adjustedValue / work, 1);
  } else if (timerState === 2) {
    if (restBudgeting <= 0) {
      progress = 0;
    } else {
      progress = 1 - Math.min(restingTime / restBudgeting, 1);
    }
  } else {
    progress = 0;
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.miniBar} />
      <Svg height={size} width={size}>
        <G rotation="-89" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#ffffff1a"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={timerState === 1 ? color1 : color2}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress * circumference}
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
