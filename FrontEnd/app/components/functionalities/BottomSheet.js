// BottomSheet.jsx
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// The maximum upward translation (near the top of the screen)
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

// Remove BottomSheetProps and BottomSheetRefProps types

const BottomSheet = React.forwardRef(({ children }, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    'worklet';
    active.value = destination !== 0;

    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      // Clamp the sheet so it doesn't go above the MAX_TRANSLATE_Y position
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      // Determine final position based on velocity or position
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        // Snap to closed (destination: 0)
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        // Snap to fully open (destination: MAX_TRANSLATE_Y)
        scrollTo(MAX_TRANSLATE_Y);
      } else {
        // If between snap points, keep it where it is or snap to a mid-point
        // For simplicity, we'll snap to open or closed based on a threshold
        if (translateY.value < -SCREEN_HEIGHT / 2) {
            scrollTo(MAX_TRANSLATE_Y);
        } else {
            scrollTo(0);
        }
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    // Interpolate border radius: sharp when fully open, rounded when partially open
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT, // Initial position: off-screen below the bottom
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;