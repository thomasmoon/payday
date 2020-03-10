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
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, // In place of Button
  View,
  ShadowPropTypesIOS
} from 'react-native';

import RNShake from 'react-native-shake';

// Own components
import FadeInView from './components/FadeInView';

// For pdf delivery
//import RNFetchBlob from 'rn-fetch-blob'

import Logo from './assets/svg/payday_logo.svg';
import LogoAlt from './assets/svg/payday_logo_alt.svg';
import BillBG from './assets/svg/payday_bill_bg.svg';
import Extra from './assets/svg/payday_extra.svg';

let exportMsg = 'Payday | 03.2020';

// Export the payroll info as text
const onShare = async () => {
  try {

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

const App = () => {

  const [mode, setMode] = useState("payday");

  const toggleMode = () => {
    setMode(mode==='payday'? 'mayday':'payday');
  }

  useEffect(() => {

    RNShake.addEventListener('ShakeEvent', () => {
      toggleMode();
    });

    return () => {
      RNShake.removeEventListener('ShakeEvent');
    };
  }, []);


  const logo = () => {
    if (mode === 'payday') {
      return <Logo width="100%" height="100" />
    } else {
      return <LogoAlt width="100%" height="100" />
    }
  }


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor='#f00' />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{...styles.scrollView, backgroundColor: mode==='payday'?PaydayColors.dark:PaydayColors.alt2}}>
          <View style={{...styles.body}}>
            <View style={styles.sectionContainer}>
              <View>
                {logo()}
              </View>
              <Text style={styles.sectionDescription}>
                Calculating
              </Text>
            </View>

            <TouchableOpacity
              style={styles.whiteButton}
              onPress={toggleMode}>
              <Text style={styles.whiteButtonText}>EASTER EGG</Text>
              <View style={styles.whiteButtonHighlight} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.whiteButton}
              onPress={onShare}>
              <Text style={styles.whiteButtonText}>EXPORT</Text>
              <View style={styles.whiteButtonHighlight} />
            </TouchableOpacity>

            <FadeInView direction="up" style={{...styles.billView, display: mode === 'mayday' ? 'none' : 'flex'}}>
              <BillBG style={styles.billBg} />
              <Image
                  style={styles.hundredEuros}
                  source={require('./assets/img/payday_bill.png')} />
            </FadeInView>

            <FadeInView direction="left" style={{...styles.ship, display: mode === 'mayday' ? 'flex' : 'none'}}>
              <Extra style={styles.billBg} />
            </FadeInView>

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    display: 'none',
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
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative'
  },
  whiteButtonText: {
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
  billView: {
    position: 'absolute',
    width: '120%',
    height: 0,
    zIndex: 1
  },
  hundredEuros: {
    width: '120%',
    position: 'absolute',
    top: -45,
    left: 0,
    zIndex: 2
  },
  billBg: {
    width: '120%',
    height: 120,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 3
  },
  ship: {
    width: '120%',
    position: 'absolute',
    top: 300,
    left: 0,
    zIndex: 2
  },
});

export default App;
