import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

// Custom components
import GameBoard from './shared/GameBoard';

// Shared style
import sharedStyle from '../../sharedStyles';

const styles:any = {
  ...sharedStyle
}

const MaydayShips = (props: any) => {

  const nav = props.navigation;

  const next = () => {
    nav.navigate('Root', {
      mode: 'mayday',
      phase: 3,
      screen: '', // Route view will redirect to screen
    });
  }
 
  return (
    <View style={styles.activeScreen}>
      <Text style={styles.helpText}>Place Your Ships</Text>
      <GameBoard />
      <TouchableOpacity
        onPress={next}
        style={styles.whiteButton}>
        <Text style={styles.whiteButtonText}>READY</Text>
        <View style={styles.whiteButtonHighlight} />
      </TouchableOpacity>
    </View>
  )
}

export default MaydayShips;