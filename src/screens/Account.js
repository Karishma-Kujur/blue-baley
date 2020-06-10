import React from 'react'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import Button from '../components/shared/Button'
import TextInput from '../components/shared/TextInput'
import Link from '../components/shared/Link'
import styles from '../assets/styles';
import Avatar from '../assets/images/avatar.jpeg'
import FlashMessage from "react-native-flash-message";

const { width, height } = Dimensions.get("window");

const AccountScreen = (props) => {
    const { navigation } = props
    const menuList = [
        {
            name: 'Card Details',
            button: 'Remove Card',
            onClick: () => { navigation.navigate('View Rack') }
        },
        {
            name: 'Personal Details',
            button: 'Edit',
            onClick: () => { navigation.navigate('View Tote') }
        },
        {
            name: 'My Address',
            button: 'Edit',
            onClick: () => { navigation.navigate('View Favorites') }
        },
        {
            name: 'Privacy',
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
            {/* <Spinner
                visible={spinner}
            /> */}
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                    <Image source={Avatar} style={imageStyle} />
                </TouchableOpacity>
                <Text style={styles.title}>My Account</Text>
            </View>
            <ScrollView>
                <View>
                    <FlatList
                        data={menuList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <>
                                <TouchableOpacity>
                                    <View style={styles.containerAccountTitle}>
                                        <Text style={styles.homeText}>{item.name}</Text>
                                        <TouchableOpacity style={styles.titleButtonStyle} onPress={item.onClick}>
                                            <Text style={{ textDecorationLine: 'underline', justifyContent: 'flex-end' }}>{item.button}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                {item.name === 'Card Details' &&
                                    <View style={styles.accountBodyContainer}>
                                        <Text style={styles.accountTextConatiner}>Cardholder</Text>
                                        <Text style={styles.accountDataContainer}>Karishma Kujur</Text>
                                        <Text style={styles.accountTextConatiner}>Card number</Text>
                                        <Text style={styles.accountDataContainer}>1234567890</Text>
                                        <Text style={styles.accountTextConatiner}>Expiration date</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountDataContainer}>BILLING ADDRESS</Text>
                                        <Text style={styles.accountTextConatiner}>Address line 1</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountTextConatiner}>Address line 2</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountTextConatiner}>City</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountTextConatiner}>Zip Code</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountTextConatiner}>Market</Text>
                                        <Text style={styles.accountDataContainer}>US</Text>
                                    </View>
                                }
                                {item.name === 'Personal Details' &&
                                    <View style={styles.accountBodyContainer}>
                                        <Text style={styles.accountTextConatiner}>Email</Text>
                                        <Text style={styles.accountDataContainer}>karishma@softsuave.com</Text>
                                        <Text style={styles.accountTextConatiner}>First Name</Text>
                                        <Text style={styles.accountDataContainer}>Karishma</Text>
                                        <Text style={styles.accountTextConatiner}>Last Name</Text>
                                        <Text style={styles.accountDataContainer}>Kujur</Text>
                                        <Text style={styles.accountTextConatiner}>Date of birth</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountTextConatiner}>Phone number</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountTextConatiner}>Gender</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountTextConatiner}>Zip Code</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountTextConatiner}>Market</Text>
                                        <Text style={styles.accountDataContainer}>US</Text>
                                    </View>
                                }
                                {item.name === 'My Address' &&
                                    <View style={styles.accountBodyContainer}>
                                        <Text style={styles.accountTextConatiner}>Billing Address</Text>
                                        <Text style={styles.accountDataContainer}>karishma@softsuave.com</Text>
                                        <Text style={styles.accountDataContainer}>Karishma</Text>
                                        <Text style={styles.accountDataContainer}>Kujur</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                        <Text style={styles.accountDataContainer}>12-12-22</Text>
                                    </View>
                                }
                            </>
                        )}

                    />
                    <View style={{ padding: 20 }}>
                        <Text style={{ textDecorationLine: 'underline', marginBottom: 10 }}>Change password</Text>
                        <Text style={{ marginBottom: 10 }}>Cancel subscription</Text>
                        <Text style={{ textDecorationLine: 'underline', marginBottom: 10 }}>Request to download my data</Text>
                    </View>
                </View>
            </ScrollView>
            <FlashMessage position="top" />
        </>
    )
}
export default AccountScreen