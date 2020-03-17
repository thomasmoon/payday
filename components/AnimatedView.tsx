import React, { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';

// Global vars to track the last mode & phase
let lastMode:string;
let lastPhase:number;

const AnimatedView = (props: any) => {

  const navigation:any = useNavigation();
  const route:any = useRoute();

  let mode = 'payday';
  let phase = 1;
  
  if (typeof route.params !== 'undefined') {
    mode = route.params.mode;
    phase = route.params.phase;
  }

  // Call this on the parent when the current animation is done
  const animationCallback = props.animationCallback;

  // transforms that are animated
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));

  // parameters for the animation
  let xMin: number, xMax: number;
  let yMin: number, yMax: number;
  let duration: number;

  // Animation style
  let animationStyle = {
    ...props.style,
    transform: [
      {
        translateX: translateX,
      },{
        translateY: translateY
      }
    ] // transform works w/ native driver 
  }

  if (props.id === 'payday') {

    // Half the window height
    let maxHeight = Dimensions.get('window').height/2;

    // Bill animation
    xMin = 0;
    xMax = 0;
    yMin = 50;
    yMax =  -maxHeight;
    duration = 1500;

    // styles
    animationStyle.bottom = 0;

  } else {
    // Ship animation (Mayday minigame)
    xMin = 0;
    xMax = 3860 / 2;
    yMin = 0;
    yMax = 0;
    duration = 1500;
  }
  
  // Mode or Phase changes
  useFocusEffect(() => {

    //console.log('Focus on AnimationView');

    // Always reset the animation when there's a mode change
    //translateX.setValue(xMin);
    //translateY.setValue(yMin);

    // Run animation when mode or last phase changes
    // Limit to visible view
    if (mode === props.id && (mode != lastMode || phase != lastPhase)) {
      // console.log('Mode has changed, so reset animation to min: ', min);
      lastMode = mode;
      lastPhase = phase;

      // beyond phase 2 on payday, do nothing
      if (mode === 'payday' && phase > 2) {
        return;
      }

      // Payday
      if (props.id === 'payday') {
        
        // Animate across the x-axis also, when proceeding in payday view
        if (phase === 2) {
          // Reverse animation
          [yMin, yMax] = [yMax, yMin];

          xMin = 0;
          xMax = -1000;
        }

      // Mayday
      } else {

        if (phase === 2) {
          xMin = 3860 / 2;
          xMax = 3860;
        } else if (phase > 2) {
          xMin = 0;
          xMax = 0;
        }
      }

      translateX.setValue(xMin);
      translateY.setValue(yMin);

      // The animation on x-axis
      Animated.timing(
        translateX,
        {
          toValue: xMax,
          duration: duration,
          useNativeDriver: true
        }
      ).start();

      // The animation on y-axis
      Animated.timing(
        translateY,
        {
          toValue: yMax,
          duration: duration,
          useNativeDriver: true
        }
      ).start(animationCallback);
    }
  
  });

  return (
    <Animated.View
      style={animationStyle}
    >
      {props.children}
    </Animated.View>
  );
}


export default AnimatedView;