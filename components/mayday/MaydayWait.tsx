import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

// Shared style
import sharedStyle from '../../sharedStyles';

const styles:any = {
  ...sharedStyle
}

const MaydayWait = (props: any) => {

  const nav = props.navigation;

  const next = () => {
    nav.navigate('Root', {
      mode: 'mayday',
      phase: 5,
      screen: '', // Route view will redirect to screen
    });
  }
 
  return (
    <View style={styles.activeScreen}>
      <Text style={styles.helpText}>Incoming torpedo...</Text>
      <TouchableOpacity
        onPress={next}
        style={styles.whiteButton}>
        <Text style={styles.whiteButtonText}>ATTACK</Text>
        <View style={styles.whiteButtonHighlight} />
      </TouchableOpacity>
    </View>
  )
}

export default MaydayWait;