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
import { Dimensions } from 'react-native';

// React Navigation
import RootStack from './routes/RootStack';
import { NavigationContainer } from '@react-navigation/native';

const App = (props: any) => {

  // Most of the magic is done in RootView

  return (

        <NavigationContainer>
          <RootStack></RootStack>
        </NavigationContainer>

  );
};

export default App;
