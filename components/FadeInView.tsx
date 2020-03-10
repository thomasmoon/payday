import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

const FadeInView = (props: any) => {

    let min: number, max: number, duration: number;
  
    if (props.direction === 'up') {
      min = -600;
      max = -100;
      duration = 1500;
    } else {
      min = -3000;
      max = -100;
      duration = 5000;
    }
  
    const [fadeAnim] = useState(new Animated.Value(min))  // Initial value for opacity: 0
  
    React.useEffect(() => {
  
      // This is a loop for flexibility, even though we'll use it only once now
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            fadeAnim,
            {
              toValue: max,
              duration: duration,
            }
          ),
          Animated.timing(
            fadeAnim,
            {
              toValue: min,
              duration: duration,
            }
          )
        ]),
        {
          iterations: -1 // Infinite
        }
      ).start()
  
    }, [])
  
    let animationStyle = {
      ...props.style,
    }
  
    if (props.direction === 'up') {
      animationStyle.bottom = fadeAnim;
    } else {
      animationStyle.left = fadeAnim;
      animationStyle.bottom = -200;
    }
  
    return (
      <Animated.View
        style={animationStyle}
      >
        {props.children}
      </Animated.View>
    );
  }


export default FadeInView;