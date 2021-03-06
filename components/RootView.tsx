/* This is not in use yet,
   but eventually the main page might be in a route */

import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity, // In place of Button
  View,
  Dimensions,
  Image,
  StatusBar,
  Platform
} from 'react-native';

// React Navigation
import PaydayStack from '../routes/PaydayStack';
import MaydayStack from '../routes/MaydayStack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// Shake phone to unlock the Mayday minigame
import RNShake from 'react-native-shake';

// Own components
import AnimatedView from './AnimatedView';

// Svgs
import Logo from '../assets/svg/payday_logo.svg';
import LogoAlt from '../assets/svg/payday_logo_alt.svg';
import Bill from '../assets/svg/euros_simplified.svg';
import BillBG from '../assets/svg/payday_bill_bg.svg';
import Extra from '../assets/svg/payday_extra.svg';

// Shared styles
//import { cartoonShadow } from './sharedStyle';
import Colors from '../sharedColors';
import { Text } from 'react-native-svg';

// Dimensions (outside component because of styles)
const windowHeight:number = Dimensions.get('window').height;
const headerHeight:number = 164; // 100 + marginVertical: 32
const navigationContainerHeight:number = windowHeight - headerHeight;

const RootView = (props:any) => {

  const nav = props.navigation;
  const route = props.route;

  // State
  //const [mode, setMode] = useState("payday");
  //const [phase, setPhase] = useState(1);

  let mode:string = 'payday';
  let phase:number = 1;
  let screen:string = '';
  
  if (typeof route.params !== 'undefined') {
    mode = route.params.mode;
    phase = route.params.phase;

    if (typeof route.params.screen !== 'undefined') {
      screen = route.params.screen;
    } else {
      screen = '';
    }
  }

  useEffect(() => {

    RNShake.addEventListener('ShakeEvent', () => {
      toggleMode();
    });

    return () => {
      RNShake.removeEventListener('ShakeEvent');
    };
  }, []);

  // Navigation events
  useFocusEffect(() => {

    //console.log('Hello from root navigation');
    //console.log('mode: ' + mode);
    //console.log('phase: ' + phase);
    //console.log('screen: ' + screen);

    // Navigate to correct phase manually through route
    // (So the global animations are triggered)
    if (phase > 1 && screen === '') {

      let partialRoutes:string[] = [];

      switch (mode) {
        case 'mayday':
          partialRoutes = ['Play', 'Ships', 'Target', 'Wait', 'GameOver'];
          break;
        case 'payday':
          partialRoutes = ['Import', 'Calculating', 'List'];
        default:
      }

      //console.log('Navigate to screen: ' + partialRoutes[phase-1])

      // navigate to sub root
      nav.navigate('Root', {
        screen: partialRoutes[phase-1],
        mode: mode,
        phase: phase
      })
    }
  });

  // These modes should be handled with navigation,
  // but the reskinning of the theme on the same page is more effective
  const toggleMode = () => {

    // Payday <> Mayday, reset to phase 1
    nav.navigate('Root', {
      mode: mode==='payday'? 'mayday':'payday',
      phase: 1,
      screen: ''
    })
  }

  // Render Payday / Mayday logo based on mode
  const logo = () => {
    if (mode === 'payday') {
      return <Logo width="100%" height="100" />
    } else {
      return <LogoAlt width="100%" height="100" />
    }
  }

  // Render the animation for the active screen
  const renderAnimations = () => {
    switch (mode) {
      case 'mayday':
        return (
          <AnimatedView id="mayday" style={{...styles.maydayView}} animationCallback={animationCallback}>
            <Extra style={styles.shipBg} />
          </AnimatedView>
        )
      case 'payday':
        default:
          return (
            <AnimatedView id="payday" style={{...styles.paydayView}} animationCallback={animationCallback}>

              <BillBG style={styles.billBg} />
              <Bill style={styles.bill} />
              
              { /*
              { Platform.OS === 'ios' || false ?
                /* SVG version 
                <Bill style={styles.bill} />
              :
                /* Bitmap version 
                <Image
                    style={styles.hundredEuros}
                    source={require('../assets/img/payday_bill.png')} />
              }*/}
            </AnimatedView>
          )
    }
  }

  const animationCallback = () => {

    // Increment the phase after certain animations
    if (mode === 'payday' && phase === 2) {
      //nextPhase();
    }
  }

  return (
    <View style={{
      height: Dimensions.get('window').height,
      backgroundColor:
        mode==='payday' ? Colors.dark : Colors.maydayBg
      }}>
      <StatusBar barStyle="light-content" />

      { /* this content won't bleed to the edge */ }
      <SafeAreaView>
        <View /* or ScrollView
          contentInsetAdjustmentBehavior="automatic" */
          style={{...styles.scrollView}}>

          <View style={{...styles.body}}>

            { /* persistent header w/ logo */}
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={toggleMode}>
                {logo()}
              </TouchableOpacity>
            </View>

            { /* partial views */ }
            <View style={styles.navigationContainer}>
                {mode === 'payday' ?
                  <PaydayStack  />
                :
                  <MaydayStack />
                }
            </View>
          </View>
        </View>
      </SafeAreaView>

      {renderAnimations()}
    </View>
  )}


const styles:any = StyleSheet.create({
  scrollView: {
    height: '100%'
  },
  body: {
    flex: 1
  },
  headerContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  navigationContainer: {
    height: navigationContainerHeight,
    width: Dimensions.get('window').width
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
    top: -200,
    left: 20,
    width: '200%',
    height: 500,
    zIndex: 2,
    transform: [{
      rotateX: '75deg'
    },{
      rotateY: '4deg',
    },{
      rotateZ: '-22deg'
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

export default RootView;