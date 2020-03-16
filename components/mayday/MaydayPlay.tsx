import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

// Shared style
import sharedStyle from '../../sharedStyles';

const styles:any = {
  ...sharedStyle
}

const MaydayPlay = (props: any) => {
 
  return (
    <>
      <TouchableOpacity
        style={styles.whiteButton}>
        <Text style={styles.whiteButtonText}>PLAY</Text>
        <View style={styles.whiteButtonHighlight} />
      </TouchableOpacity>
    </>
  )
}

export default MaydayPlay;