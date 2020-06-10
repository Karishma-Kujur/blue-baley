import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Button from '../components/shared/Button'
import Link from '../components/shared/Link'
import Wallpaper from '../assets/images/Wallpaper.png'

const SplashScreen = (props) => {
    const { navigation } = props

    const onSwipeLeft = (gestureState) => {
        navigation.navigate('Sign Up')
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeLeft={(state) => onSwipeLeft(state)}
            config={config}
            style={styles.container}
        >
            <View>
                <Image source={Wallpaper} style={styles.wallpaper} />
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.row}>
                    <Button label="GET STATRED" onPress={() => navigation.navigate('Sign Up')} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>I am existing user?</Text>
                    <Link label="Login" onPress={() => navigation.navigate('Login')} />
                </View>
            </View>
        </GestureRecognizer>
    );
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7ce26'
    },
    wallpaper: {
        width: '100%',
        height: '95%',
        alignItems: 'flex-end'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
    },
    actionsContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    text: {
        textAlign: 'center',
        marginLeft: 250
    }
});