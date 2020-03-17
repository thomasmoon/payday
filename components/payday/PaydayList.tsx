import React, { useState } from 'react';
import { FlatList, Text, Share, TouchableOpacity, Alert, View } from "react-native";
import { Employee } from '../../lib/payrollCalc/index';

// Shared style
import sharedStyle from '../../sharedStyles';
import { faBold } from '@fortawesome/free-solid-svg-icons';

export default function PaydayList (props: any) {

    //const employees = props.employees;

    const styles:any = {
        ...sharedStyle,
        payrollList: {
          backgroundColor: '#fff',
          marginHorizontal: 24,
          marginBottom: 32,
          height: 300
        },
        item: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc'
        },
        title: {
          fontSize: 24
        },
    }

    const Item = ({name}:any) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => { itemPressed(name)}}>
          <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
      );
    }

    const itemPressed = (name: any) => {
        Alert.alert('Clicked employee: ', name);
    }

    const [employees, setEmployees] = useState([
        { key: '1', name: 'Employee 1' },
        { key: '2', name: 'Employee 2' },
        { key: '3', name: 'Employee 3' },
        { key: '4', name: 'Employee 4' }
    ])

    // Export the payroll info as text
  const exportList = async () => {
    try {

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
      <View style={styles.activeScreen}>
        <Text style={styles.helpText}>Employees</Text>
        <FlatList
        data={employees}
        style={styles.payrollList}
        renderItem={({ item }) => <Item name={item.name} />}
      />
        <TouchableOpacity
          style={styles.whiteButton}
          onPress={exportList}>
          <Text style={styles.whiteButtonText}>EXPORT</Text>
          <View style={styles.whiteButtonHighlight} />
        </TouchableOpacity>
      </View>
    )
}