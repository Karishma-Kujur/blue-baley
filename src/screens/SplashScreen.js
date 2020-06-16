import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Button from '../components/shared/Button'
import Link from '../components/shared/Link'
import Wallpaper from '../assets/images/Wallpaper.png'
const { width, height } = Dimensions.get("window");

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
            <Image source={Wallpaper} style={styles.wallpaper} />
            <View style={styles.actionsContainer}>
                <Button label="GET STATRED" onPress={() => navigation.navigate('Sign Up')} />
                <View style={styles.linkContainer}>
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
        backgroundColor: '#f7ce26',
        width: width,
        height: height,
    },
    wallpaper: {
        width: width,
        height: height - 50,
        alignItems: 'flex-end'
    },
    actionsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        textAlign: 'center'
    },
    linkContainer: {
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15
    }
});