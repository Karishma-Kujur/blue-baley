import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image, Linking } from 'react-native'
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import ToteItem from './ToteItem'
import Avatar from '../assets/images/avatar.jpeg'
import * as ToteAction from '../actions/ToteAction';
import * as ToteApi from '../api/Tote'
import Spinner from 'react-native-loading-spinner-overlay';
import PopupDialog, { DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import * as Accounts from '../constants/Accounts'

const { width, height } = Dimensions.get("window");

const ToteScreen = (props) => {
    const { navigation, ToteAction, toteItems, user } = props
    const [spinner, setLoader] = useState('')
    const [addAddress, setAddAddress] = useState(false)
    const [selectAddress, showSelectAddress] = useState(false)
    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
            borderRadius: 15
        }
    ];

    const getTotes = () => {
        setLoader(true)
        ToteApi.getTotes()
            .then((result) => {
                setLoader(false)
                ToteAction.setTotes(result)

            })
            .catch((error) => {
                setLoader(false)
                Alert.alert('Invalid User name or Password', 'Please enter valid user name and password')
            })
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        getTotes()
    }, [isFocused])

    const handleRefreshTote = () => {
        getTotes()
    }

    const url = 'https://www.departmynt.co/checkout'
    const handleProceedToShipping = useCallback(async () => {
        // showSelectAddress(true)
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            // Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <View style={styles.containerMatches}>
            <Spinner
                visible={spinner}
            />
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                    <Image source={Avatar} style={imageStyle} />
                </TouchableOpacity>
                <Text style={styles.title}>Tote</Text>
            </View>
            <ScrollView>
                <FlatList
                    data={toteItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ToteItem
                            id={item.id}
                            productId={item.productId}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            quantity={item.quantity}
                            toteEdited={handleRefreshTote}
                        />
                    )}
                />
                <PopupDialog
                    visible={selectAddress}
                    containerStyle={{ justifyContent: 'flex-end' }}
                    height={240}
                    width={width}
                    onTouchOutside={() => showSelectAddress(false)
                    }
                    dialogTitle={
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                                <Text style={{ fontWeight: 'bold' }}>SELECT DELIVERY ADDRESS</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                                <TouchableOpacity onPress={() => {
                                    showSelectAddress(false)
                                    navigation.navigate('Add Address')
                                }}>
                                    <Text style={{ fontWeight: 'bold', color: 'grey' }}>EDIT ADDRESS</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="DELIVER HERE"
                                onPress={() => {
                                    showSelectAddress(false)
                                    navigation.navigate('Payment')
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style={{ marginTop: 10, marginBottom: 8, fontWeight: 'bold', fontSize: 14 }}>{user.firstName + ' ' + user.lastName}</Text>
                        {user.billing && user.billing.address_1 && <Text>{user.billing.address_1 + ', ' + user.billing.address_2}</Text>}
                        <Text>{user.billing.city + ', ' + user.billing.postcode + ', ' + user.billing.state}</Text>
                        <Text style={{ marginTop: 10 }}>{'Mobile: ' + Accounts.PersonalInfo.phoneNumber}</Text>
                    </DialogContent>
                </PopupDialog>
            </ScrollView>
            <View style={styles.bottom}>
                <Button label="Proceed to shipping" onPress={handleProceedToShipping} />
            </View>
        </View>
    )
}

const mapStateToProps = ({ tote, user }) => {
    return {
        toteItems: tote,
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ToteAction: bindActionCreators(ToteAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ToteScreen)

