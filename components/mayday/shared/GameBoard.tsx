import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from "react-native";

import GameTile from './GameTile';

// Shared style
import sharedStyle from '../../../sharedStyles';
import { DrawerItemList } from '@react-navigation/drawer';

const styles:any = {
  ...sharedStyle,
  gameBoard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ccc',
    marginHorizontal: 32,
    marginBottom: 32
  }
}

const GameBoard = ({size = 8}:{size?: number}) => {

  const [ tiles, setTiles ] = useState<{id: number}[]>([]);
 
  useEffect(()=>{

    console.log('Use effect from Game Board', tiles);

    if (!tiles.length) {
      generateBoard();
    }

  }, [tiles]);


  // Generate the game pieces
  const generateBoard = () => {

    let newTiles = [];

    for (let i=0; i<size**2; i++) {

      newTiles.push({ 
        id: i
      });
      
    }

    setTiles(newTiles);
  }

  const printBoard = () => {

    console.log('Print game board, size: ' + size);

    return tiles.map(({id}:{id:number}) => {
      return (
        <GameTile
          id={id}
          key={id}
          />
      )
    });
  }

  return (
    <View style={styles.gameBoard}>
      {printBoard()}
    </View>
  )
}

export default GameBoard;