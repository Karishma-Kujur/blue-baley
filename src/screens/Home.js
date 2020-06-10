import React from 'react'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import Button from '../components/shared/Button'
import TextInput from '../components/shared/TextInput'
import Link from '../components/shared/Link'
import styles from '../assets/styles';
import Avatar from '../assets/images/avatar.jpeg'
import FlashMessage from "react-native-flash-message";

const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
    const { navigation } = props
    const menuList = [
        {
            name: 'View Rack',
            onClick: () => { navigation.navigate('View Rack') }
        },
        {
            name: 'View Tote',
            onClick: () => { navigation.navigate('View Tote') }
        },
        {
            name: 'View Favorites',
            onClick: () => { navigation.navigate('View Favorites') }
        },
        {
            name: 'My Chart',
            onClick: () => { }
        },
        {
            name: 'Order History',
            onClick: () => { navigation.navigate('Order History') }
        },
        {
            name: 'My Account',
            onClick: () => { navigation.navigate('My Account') }
        },
        {
            name: 'Log Out',
            onClick: () => { }
        }
    ]
    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
        }
    ];

    return (
        <>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                        <Image source={Avatar} style={imageStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.homeContainer}>
                <Text style={styles.homeTitle}>Hello, Beautiful</Text>
                    <FlatList
                        data={menuList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={item.onClick}>
                                <View style={styles.containerMessage}>
                                    <Text style={styles.homeText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ScrollView>
            <FlashMessage position="top" />
        </>
    )
}
export default HomeScreen