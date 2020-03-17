import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

// File picker
import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';

// Payroll calculaton
import { PayrollCalc } from '../../lib/payrollCalc/';

// Shared style
import sharedStyle from '../../sharedStyles';

const styles: any = {
  ...sharedStyle
}

const PaydayImport = (props: any) => {

  const nav:any = props.navigation;

  let payrollOutput:any = '';
 
  // Import csv file
  const importCsv = async () => {
    try {
      const res = await DocumentPicker.pick({
        // DocumentPicker.types.plainText only works for .csv on iOS
        type: [DocumentPicker.types.allFiles],
      });


      RNFS.readFile(res.uri, 'ascii').then(res=>{

        // animate forward at this point through root
        nav.navigate('Root', {
          mode: 'payday',
          phase: 2,
          screen: ''
        });

        // Calculate the payroll
        let payrollCalc = new PayrollCalc(res);
        payrollOutput = payrollCalc.processRows()
      })
      .catch(err => {
        console.log(err.message, err.code);
      });


    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('Document picker cancelled');

      } else {
        console.log('Problem with file picker.');
        throw err;
      }
    }
  }
 
  return (
    <View style={styles.activeScreen}>
      <TouchableOpacity
        style={styles.whiteButton}
        onPress={importCsv}>
        <Text style={styles.whiteButtonText}>IMPORT .CSV</Text>
        <View style={styles.whiteButtonHighlight} />
      </TouchableOpacity>
    </View>
  )
}

export default PaydayImport;