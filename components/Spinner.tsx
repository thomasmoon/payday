import React, { Component, useState } from 'react';
import { Animated, Easing, View, Text, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Spinner = (props: any) => {

    const [spin] = useState(new Animated.Value(0));

    // this will be set to false when the view unmounts
    let animateSpinner: boolean = true;

    const maxLoops: number = 2;
    let loopCount: number = 0;

    const animateSpin = () => {

        // End if this view is no longer active
        if (!animateSpinner || loopCount > maxLoops) {

            // callback if we have it
            if (props.loadedCallback) {
                props.loadedCallback();
            }
            return;
        }

        loopCount++;

        spin.setValue(0);

        Animated.timing(
            spin,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(animateSpin);
    }

    // Mode or Phase changes
    React.useEffect(() => {

        // start spinning
        animateSpin();

        // cleanup
        return () => {
            animateSpinner = false;
        }
    });

    const rotate = spin.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']});

    return(
        <View>
            <Animated.View style={{transform: [{rotate: rotate}]}}>
                <FontAwesomeIcon icon={faSyncAlt} />
            </Animated.View>
        </View>
    )
}

export default Spinner;