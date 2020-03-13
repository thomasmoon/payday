import React, { useState, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

// Global vars to track the last mode & phase
let lastMode:string;
let lastPhase:number;

const AnimatedView = (props: any) => {

  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));

  let xMin: number, xMax: number;
  let yMin: number, yMax: number;
  let duration: number;

  let animationStyle = {
    ...props.style,
    transform: [
      {
        translateX: translateX,
      },{
        translateY: translateY
      }
    ] // Use w/ native driver 
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

    // Run animation when mode or last phase changes
    // Limit to visible view
    if (props.mode === props.id && (props.mode != lastMode || props.phase != lastPhase)) {
      // console.log('Mode has changed, so reset animation to min: ', min);
      lastMode = props.mode;
      lastPhase = props.lastPhase;

      // When going to phase 2 of Payday, dismiss the bill in a different way
      if ((props.id === 'payday' && props.mode !== 'payday') || props.phase > 1) {
        // Reverse animation
        [yMin, yMax] = [yMax, yMin];
        
        // Animate across the x-axis also, when proceeding in payday view
        if (props.phase > 1) {
          xMin = 0;
          xMax = -1000;
        }
      }

      translateX.setValue(xMin);
      translateY.setValue(yMin);


      if (xMin !== xMax) {
        // The animation on x-axis
        Animated.timing(
          translateX,
          {
            toValue: xMax,
            duration: duration,
            useNativeDriver: true
          }
        ).start();
      }

      if (yMin !== yMax) {
        // The animation on y-axis
        Animated.timing(
          translateY,
          {
            toValue: yMax,
            duration: duration,
            useNativeDriver: true
          }
        ).start();
      }

    }

  }, [props.mode, props.phase]); // Limit this effect to redrawing only mode changes

  return (
    <Animated.View
      style={animationStyle}
    >
      {props.children}
    </Animated.View>
  );
}


export default AnimatedView;