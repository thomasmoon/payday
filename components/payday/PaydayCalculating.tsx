import React, { useState } from 'react';
import { Text, View } from "react-native";

// Custom components
import Spinner from '../../components/Spinner';

// Shared style
import sharedStyle from '../../sharedStyles';

const styles: any = {
  ...sharedStyle,
  calculating: {
    textAlign: 'center',
    alignItems: 'center'
  },
  calculatingText: {
    fontSize: 18,
    lineHeight: 36,
    marginBottom: 8,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center'
  }
}

const PaydayCalculating = (props: any) => {
 
  return (
    <View style={styles.calculating}>
      <Text style={styles.calculatingText}>
      Calculating
      </Text>
      <Spinner />
    </View>
  )
}

export default PaydayCalculating;