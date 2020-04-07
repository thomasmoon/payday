import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from "react-native";

// Shared style
import sharedStyle from '../../../sharedStyles';
const rowCount = 8;

const styles:any = {
  ...sharedStyle,
  gameTileWrapper:{
    padding: 1, 
    width: `${1/rowCount*100}%`,
  },
  gameTile: {
      backgroundColor: '#fff',
      paddingBottom: '100%',
  }
}

type GameTile = {
  id: number
}

const GameTile = ({id}:GameTile) => {

  const press = () => {
      Alert.alert(`Game tile ${id+1} pressed.`)
  }

  return(
  <View style={styles.gameTileWrapper}>
    <TouchableOpacity
        style={styles.gameTile}
        onPress={press}>
    </TouchableOpacity>
  </View>
  )
}

export default GameTile;