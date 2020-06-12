import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image, LayoutAnimation } from 'react-native'
import styles from '../assets/styles';
import Avatar from '../assets/images/avatar.jpeg'
import FlashMessage from "react-native-flash-message";
import RadioButton from '../components/shared/RadioButton'
import PresonalDetailsForm from '../components/PersonalDetailsForm'
import AddressForm from '../components/AddressForm'
import * as Accounts from '../constants/Accounts'

const { width, height } = Dimensions.get("window");

const AccountScreen = (props) => {
    const { navigation } = props
    const [removeCard, changeRemoveCard] = useState(false)
    const [editPersonalDetails, changeEditPersonalDetails] = useState(false)
    const [editAddress, changeEditAddress] = useState(false)
    const [expandedIds, changeExpanded] = useState([])
    const menuList = [
        {
            id: 1,
            name: 'Card Details',
            button: expandedIds.includes(1) ? (removeCard ? '' : 'Remove Card') : '',
            onClick: () => { changeRemoveCard(!removeCard) }
        },
        {
            id: 2,
            name: 'Personal Details',
            button: expandedIds.includes(2) ? (editPersonalDetails ? 'Save' : 'Edit') : '',
            onClick: () => { changeEditPersonalDetails(!editPersonalDetails) }
        },
        {
            id: 3,
            name: 'MY ADDRESSES',
            button: expandedIds.includes(3) ? (editAddress ? 'Save' : 'Edit') : '',
            onClick: () => { changeEditAddress(!editAddress) }
        },
        {
            id: 4,
            name: 'PRIVACY',
            onClick: () => { }
        }
    ]
    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
            borderRadius: 15
        }
    ];

    const defaultAddress = [
        {
            id: 1,
            answer: 'Use as Default'
        }
    ]

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
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={menuList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <>
                                <TouchableOpacity onPress={() => {
                                    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
                                    let ids = [...expandedIds]
                                    if (ids.includes(item.id)) {
                                        ids = ids.filter(id =>
                                            id !== item.id
                                        )
                                    } else {
                                        ids.push(item.id)
                                    }
                                    changeExpanded(ids)
                                }}>
                                    <View style={styles.containerAccountTitle}>
                                        <Text style={{ fontWeight: 'bold', padding: 5, width: 180 }}>{item.name}</Text>
                                        <View style={styles.titleButtonStyle}>
                                            <TouchableOpacity onPress={item.onClick}>
                                                <Text style={{ textDecorationLine: 'underline' }}>{item.button}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {expandedIds.includes(item.id) && <>
                                    {!removeCard && item.name === 'Card Details' &&
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
                                    {!editPersonalDetails && item.name === 'Personal Details' &&
                                        <View style={styles.accountBodyContainer}>
                                            <Text style={styles.accountTextConatiner}>Email</Text>
                                            <Text style={styles.accountDataContainer}>{Accounts.PersonalInfo.email}</Text>
                                            <Text style={styles.accountTextConatiner}>First Name</Text>
                                            <Text style={styles.accountDataContainer}>{Accounts.PersonalInfo.firstName}</Text>
                                            <Text style={styles.accountTextConatiner}>Last Name</Text>
                                            <Text style={styles.accountDataContainer}>{Accounts.PersonalInfo.lastName}</Text>
                                            <Text style={styles.accountTextConatiner}>Date of birth</Text>
                                            <Text style={styles.accountDataContainer}>{Accounts.PersonalInfo.dateOfBirth}</Text>
                                            <Text style={styles.accountTextConatiner}>Phone number</Text>
                                            <Text style={styles.accountDataContainer}>{Accounts.PersonalInfo.phoneNumber}</Text>
                                            <Text style={styles.accountTextConatiner}>Gender</Text>
                                            <Text style={styles.accountDataContainer}>{Accounts.PersonalInfo.gender}</Text>
                                            <Text style={styles.accountTextConatiner}>Zip Code</Text>
                                            <Text style={styles.accountDataContainer}>{Accounts.PersonalInfo.zipCode}</Text>
                                            <Text style={styles.accountTextConatiner}>Market</Text>
                                            <Text style={styles.accountDataContainer}>{Accounts.PersonalInfo.market}</Text>
                                            <RadioButton items={defaultAddress} />
                                        </View>
                                    }
                                    {editPersonalDetails && item.name === 'Personal Details' &&
                                        <PresonalDetailsForm details={Accounts.PersonalInfo}/>
                                    }
                                    {!editAddress && item.name === 'MY ADDRESSES' &&
                                        <View style={styles.accountBodyContainer}>
                                            <Text style={styles.accountTextConatiner}>Billing Address</Text>
                                            <Text>XXXXXXXXX</Text>
                                            <Text>XXXXXXXXX</Text>
                                            <Text>XXXXXXXXX</Text>
                                            <Text>XXXXXXXXX</Text>
                                            <Text>XXXXXXXXX</Text>
                                        </View>
                                    }
                                    {editAddress && item.name === 'MY ADDRESSES' &&
                                        <AddressForm />
                                    }
                                    {item.name === 'PRIVACY' &&
                                        <View style={{ padding: 20 }}>
                                            <Text style={{ textDecorationLine: 'underline', marginBottom: 10 }}>Change password</Text>
                                            <Text style={{ marginBottom: 10 }}>Cancel subscription</Text>
                                            <Text style={{ textDecorationLine: 'underline', marginBottom: 10 }}>Request to download my data</Text>
                                        </View>
                                    }
                                </>
                                }
                            </>
                        )}
                    />

                </View>
            </ScrollView>
            <FlashMessage position="top" />
        </>
    )
}
export default AccountScreen