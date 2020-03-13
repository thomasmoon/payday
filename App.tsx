/**
 * Payday Demo App based React Native
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, // In place of Button
  View,
  Dimensions
} from 'react-native';

// Shake phone to unlock the Mayday minigame
import RNShake from 'react-native-shake';

// Own components
import AnimatedView from './components/AnimatedView';

// Svgs
import Logo from './assets/svg/payday_logo.svg';
import LogoAlt from './assets/svg/payday_logo_alt.svg';
import Bill from './assets/svg/euros.svg';
import BillBG from './assets/svg/payday_bill_bg.svg';
import Extra from './assets/svg/payday_extra.svg';

// File picker
import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';

// Payroll calculaton
import { PayrollCalc } from './lib/payrollCalc/';

const windowHeight = Dimensions.get('window').height;
let exportMsg = 'Payday | 03.2020';
let payrollOutput= '';

const App = () => {

  const [mode, setMode] = useState("payday");
  const [phase, setPhase] = useState(1);

  const toggleMode = () => {
    setMode(mode==='payday'? 'mayday':'payday');
    setPhase(1);
  }

  const nextPhase = () => {
    console.log('Trigger next phase', phase);
    setPhase(phase+1);
  }

  useEffect(() => {

    RNShake.addEventListener('ShakeEvent', () => {
      toggleMode();
    });

    return () => {
      RNShake.removeEventListener('ShakeEvent');
    };
  }, []);


  // Render Payday / Mayday logo based on mode
  const logo = () => {
    if (mode === 'payday') {
      return <Logo width="100%" height="100" />
    } else {
      return <LogoAlt width="100%" height="100" />
    }
  }

  // Export the payroll info as text
  const onShare = async () => {
    try {

      nextPhase();

      let shareOptions = {
        message: exportMsg
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

  // Import csv file
  const importCsv = async () => {
    try {
      const res = await DocumentPicker.pick({
        // DocumentPicker.types.plainText only works for .csv on iOS
        type: [DocumentPicker.types.allFiles],
      });


      RNFS.readFile(res.uri, 'ascii').then(res=>{


        // animate forward at this point
        nextPhase();

        // File contents
        console.log(res);

        // Calculate the payroll
        let payrollCalc = new PayrollCalc(res);
        payrollOutput = payrollCalc.processRows()

        setTimeout(2000, ()=>{
          nextPhase();
        });
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

  // Render the animation for the active screen
  const renderAnimations = () => {
    switch (mode) {
      case 'mayday':
        return (
          <AnimatedView id="mayday" mode={mode} phase={phase} style={{...styles.maydayView, visibility: mode==='mayday'?'visible':'hidden'}}>
            <Extra style={styles.shipBg} />
          </AnimatedView>
        )
      case 'payday':
        default:
          return (
            <AnimatedView id="payday" mode={mode} phase={phase} style={{...styles.paydayView, visibility: mode==='mayday'?'visible':'hidden'}}>
              <BillBG style={styles.billBg} />
              <Bill style={styles.bill} />
              {/* Bitmap version of bill: <Image
                  style={styles.hundredEuros}
                  source={require('./assets/img/payday_bill.png')} />*/}
            </AnimatedView>
          )
    }
  }

  // Render calculating
  const renderCalculating = () => {
    if (mode==='payday' && phase===2)
    return (
      <Text style={styles.sectionDescription}>
        Calculating
      </Text>
    )
  } 

  // Render payroll output
  const renderOutput = () => {
    if (mode==='payday' && phase===3)
    return (
      <Text style={styles.sectionDescription}>
        {payrollOutput}
      </Text>
    )
  } 

  return (
    <View style={{
      backgroundColor: mode==='payday'? PaydayColors.dark : PaydayColors.alt2
      }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{...styles.scrollView}}>
          <View style={{...styles.body}}>
            <View style={styles.sectionContainer}>
              <TouchableOpacity onPress={toggleMode}>
                {logo()}
              </TouchableOpacity>
              {renderCalculating()}
            </View>

            {/* import button */}
            <TouchableOpacity
              style={{...styles.whiteButton, display: mode==='payday' && phase === 1 ? 'flex':'none'}}
              onPress={importCsv}>
              <Text style={styles.whiteButtonText}>IMPORT .CSV</Text>
              <View style={styles.whiteButtonHighlight} />
            </TouchableOpacity>

             {/* play button */}
             <TouchableOpacity
              style={{...styles.whiteButton, display: mode==='mayday' ? 'flex':'none'}}
              >
              <Text style={styles.whiteButtonText}>PLAY</Text>
              <View style={styles.whiteButtonHighlight} />
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>

      {renderAnimations()}
      
    </View>
  );
};

const PaydayColors = {
  black: '#000000',
  dark: '#005B30',
  light: '#99FEB2',
  money_right: '#4E865A',
  alt1: '#E80F4C',
  alt2: '#000F59'
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%'
  },
  body: {
    flex: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: PaydayColors.black,
    textAlign: 'center'
  },
  whiteButton: {
    backgroundColor: '#efefef',
    borderRadius: 30,
    margin: 30,
    marginBottom: 0,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    position: 'relative'
  },
  whiteButtonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center'
  },
  whiteButtonHighlight: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 10,
    position: 'absolute',
    top: 4,
    left: 12,
    right: 12
  },
  paydayView: {
    position: 'absolute',
    width: '120%',
    zIndex: 1
  },
  bill: {
    position: 'absolute',
    top: -148,
    left: 150,
    zIndex: 2,
    transform: [{
      rotateX: '75deg'
    },{
      rotateY: '4deg',
    },{
      rotateZ: '-22deg'
    },{
      scale: 1.275
    }] 
  },
  billBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 3
  },
  maydayView: {
    bottom: 50, // Show the top 2/3 of the ship
    height: windowHeight/2, // Limit displayed area to half the screen
    position: 'absolute',
    zIndex: 1
  },
  shipBg: {
    position: 'absolute',
    left: -3400, // start offscreen to avoid flashes
    top: 0,
    zIndex: 2
  }
});

export default App;
