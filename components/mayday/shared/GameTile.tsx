import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from "react-native";

// Shared style
import sharedStyle from '../../../sharedStyles';

const styles:any = {
  ...sharedStyle,
  gameTile:{
      width: 32,
      height: 32,
      backgroundColor: '#fff',
      marginRight: 2,
      marginBottom: 2
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
  <TouchableOpacity
      style={styles.gameTile}
      onPress={press}>
  </TouchableOpacity>
  )
}

export default GameTile;