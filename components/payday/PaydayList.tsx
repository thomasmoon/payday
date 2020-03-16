import React, { useState } from 'react';
import { FlatList, Text, Share, TouchableOpacity, Alert, View } from "react-native";
import { Employee } from '../../lib/payrollCalc/index';

// Shared style
import sharedStyle from '../../sharedStyles';

const styles: any = {
  ...sharedStyle
}

export default function PaydayList (props: any) {

    //const employees = props.employees;

    const styles = {
        ...sharedStyle,
        payrollList: {
          backgroundColor: '#fff',
          marginHorizontal: 24,
          height: 300
        }
    }

    const itemPressed = () => {
        Alert.alert('hello');
    }

    const [employees, setEmployees] = useState([
        { name: 'Thomas', key: '1'}
    ])

    // Export the payroll info as text
  const exportList = async () => {
    try {

      //nextPhase();

      let shareOptions = {
        message: ''
      }

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

    return (
      <View style={styles.payrollList}>
        <Text>Payroll list</Text>
        <FlatList
          data={employees}
          renderItem={({ item: any }) => (
            <TouchableOpacity onPress={itemPressed}>
                <Text>Test</Text>
            </TouchableOpacity>
          )}
        ></FlatList>
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={exportList}>
          <Text style={styles.whiteButtonText}>EXPORT</Text>
          <View style={styles.whiteButtonHighlight} />
        </TouchableOpacity>
      </View>
    )
}