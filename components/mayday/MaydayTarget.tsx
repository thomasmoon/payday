import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

// Shared style
import sharedStyle from '../../sharedStyles';

const styles:any = {
  ...sharedStyle
}

const MaydayTarget = (props: any) => {
 
  const nav = props.navigation;

  const next = () => {
    nav.navigate('Root', {
      mode: 'mayday',
      phase: 4,
      screen: '', // Route view will redirect to screen
    });
  }

  return (
    <View style={styles.activeScreen}>
      <Text style={styles.helpText}>Choose a square</Text>
      <TouchableOpacity
        onPress={next}
        style={styles.whiteButton}>
        <Text style={styles.whiteButtonText}>FIRE!</Text>
        <View style={styles.whiteButtonHighlight} />
      </TouchableOpacity>
    </View>
  )
}

export default MaydayTarget;