import React, { useState } from 'react';
import { Text, View } from "react-native";

// Custom components
import Spinner from '../../components/Spinner';

// Shared style
import sharedStyle from '../../sharedStyles';

const styles: any = {
  ...sharedStyle,
  calculatingText: {
    fontSize: 18,
    lineHeight: 36,
    marginBottom: 8,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center'
  },
  activeScreen: {
    ...sharedStyle.activeScreen,
    alignItems: 'center'
  }
}

const PaydayCalculating = (props: any) => {

  const nav = props.navigation;

  const loadedCallback = () => {
    
    console.log('Calculating done, navigate to new screen');

    // Don't send the screen here – we'll go through
    // root w/ params to trigger animations first
    nav.navigate('Root', {
      mode: 'payday',
      phase: 3,
      screen: ''
    })
  }
 
  return (
    <View style={styles.activeScreen}>
      <Text style={styles.calculatingText}>
      Calculating
      </Text>
      <Spinner loadedCallback={loadedCallback} />
    </View>
  )
}

export default PaydayCalculating;