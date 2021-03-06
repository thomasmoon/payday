import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

// Shared style
import sharedStyle from '../../sharedStyles';

const styles:any = {
  ...sharedStyle
}

const MaydayPlay = (props: any) => {

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
      <TouchableOpacity
        style={styles.whiteButton}
        onPress={next}>
        <Text style={styles.whiteButtonText}>PLAY</Text>
        <View style={styles.whiteButtonHighlight} />
      </TouchableOpacity>
    </View>
  )
}

export default MaydayPlay;