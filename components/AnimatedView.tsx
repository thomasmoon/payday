import React, { useState, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

// Global var to track the last mode
let lastMode:string;

const AnimatedView = (props: any) => {

    let min: number, max: number, duration: number;
  
    if (props.id === 'payday') {

      // Half the window height
      let maxHeight = Dimensions.get('window').height/2;

      // Bill animation
      min = 0;
      max =  -maxHeight;
      duration = 1000;

    } else {
      // Ship animation (Mayday minigame)
      min = -3400;
      max = 460;
      duration = 4000;
    }
    const [fadeAnim] = useState(new Animated.Value(min))  // Initial value for opacity: 0

    React.useEffect(() => {

      // Always reset the animation when there's a mode change
      fadeAnim.setValue(min);

      // run the animation only when this view is active
      if (props.mode === props.id && props.mode != lastMode) {
        // console.log('Mode has changed, so reset animation to min: ', min);
        lastMode = props.mode;

        // The animation
        Animated.timing(
          fadeAnim,
          {
            toValue: max,
            duration: duration,
            useNativeDriver: true
          }
        ).start();

      }

    }, [props.mode]); // Limit this effect to redrawing only mode changes

    let animationStyle = {
      ...props.style
    }
  
    // Use transforms with native driver 
    animationStyle.transform = [];

    if (props.direction === 'up') {
      animationStyle.bottom = 0;
      animationStyle.transform.push({
        translateY: fadeAnim
      })
      //animationStyle.height = fadeAnim;
    } else {
      animationStyle.bottom = -1500;
      animationStyle.transform.push({
        translateX: fadeAnim
      })
    }
  
    return (
      <Animated.View
        style={animationStyle}
      >
        {props.children}
      </Animated.View>
    );
  }


export default AnimatedView;