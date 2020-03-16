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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity, // In place of Button
  View,
  Dimensions,
  Image,
  Platform,
  DeviceEventEmitter
} from 'react-native';

// React Navigation
import RootStack from './routes/RootStack';
import PaydayStack from './routes/PaydayStack';
import MaydayStack from './routes/MaydayStack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// Own components
import AnimatedView from './components/AnimatedView';

// Svgs
import Logo from './assets/svg/payday_logo.svg';
import LogoAlt from './assets/svg/payday_logo_alt.svg';
import Bill from './assets/svg/euros.svg';
import BillBG from './assets/svg/payday_bill_bg.svg';
import Extra from './assets/svg/payday_extra.svg';

// Dimensions (outside component because of styles)
const windowHeight:number = Dimensions.get('window').height;
const headerHeight:number = 164; // 100 + marginVertical: 32
const navigationContainerHeight:number = windowHeight - headerHeight;

const App = (props: any) => {

  // App is not one of the navigation screens at this point
  //const navigation = useNavigation();

  // Reference to the main app (used on NavigationContainer)
  const ref = React.useRef(null);

  // State
  const [mode, setMode] = useState("payday");
  const [phase, setPhase] = useState(1);

  // Other vars (to be migrated out of main app)
  let exportMsg = 'Payday | 03.2020';
  let payrollOutput= '';

  const nextPhase = () => {
    setPhase(phase + 1);
  }

  const animationCallback = () => {

    // Increment the phase after certain animations
    if (mode === 'payday' && phase === 2) {
      nextPhase();
    }
  }

  return (

        <NavigationContainer>
          <RootStack></RootStack>
        </NavigationContainer>

  );
};

export default App;
