import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

// Shared style
import sharedStyle from '../../sharedStyles';

const styles:any = {
  ...sharedStyle
}

const MaydayGameOver = (props: any) => {
 
  const nav = props.navigation;

  const next = () => {
    nav.navigate('Root', {
      mode: 'mayday',
      phase: 2,
      screen: '', // Route view will redirect to screen
    });
  }

  return (
    <View style={styles.activeScreen}>
      <Text style={styles.helpText}>Game Over</Text>
      <Text style={styles.extraText}>You Win!</Text>
      <TouchableOpacity
        onPress={next}
        style={styles.whiteButton}>
        <Text style={styles.whiteButtonText}>PLAY AGAIN</Text>
        <View style={styles.whiteButtonHighlight} />
      </TouchableOpacity>
    </View>
  )
}

export default MaydayGameOver;