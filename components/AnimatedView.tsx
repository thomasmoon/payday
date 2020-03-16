import React, { useState, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

// Global vars to track the last mode & phase
let lastMode:string;
let lastPhase:number;

const AnimatedView = (props: any) => {

  const navigation = useNavigation();
  const route = useRoute();

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
    duration = 1000;

    // styles
    animationStyle.bottom = 0;

  } else {
    // Ship animation (Mayday minigame)
    xMin = 0;
    xMax = 3860;
    yMin = 0;
    yMax = 0;
    duration = 4000;
  }
  
  // Mode or Phase changes
  React.useEffect(() => {

    // Always reset the animation when there's a mode change
    //translateX.setValue(xMin);
    //translateY.setValue(yMin);

    //const unsubscribe = navigation.addListener('focus', () => {

    console.log('Focus Root page');

    // Run animation when mode or last phase changes
    // Limit to visible view
    if (mode === props.id && (mode != lastMode || phase != lastPhase)) {
      // console.log('Mode has changed, so reset animation to min: ', min);
      lastMode = mode;
      lastPhase = phase;

      // beyond phase 2, do nothing
      if (phase > 2) {
        return;
      }

      // When going to phase 2 of Payday, dismiss the bill in a different way
      if ((props.id === 'payday' && mode !== 'payday') || phase === 2) {
        // Reverse animation
        [yMin, yMax] = [yMax, yMin];
        
        // Animate across the x-axis also, when proceeding in payday view
        if (phase === 2) {
          xMin = 0;
          xMax = -1000;
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
    //return unsubscribe;
  
  }, [navigation]); // Limit this effect to redrawing only mode changes

  return (
    <Animated.View
      style={animationStyle}
    >
      {props.children}
    </Animated.View>
  );
}


export default AnimatedView;