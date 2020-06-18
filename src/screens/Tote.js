import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
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
    const { navigation, ToteAction, toteItems } = props
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

    const handleProceedToShipping = () => {
        showSelectAddress(true)
    }

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
                                <Text style={{fontWeight: 'bold'}}>SELECT DELIVERY ADDRESS</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                                <TouchableOpacity onPress={() => {
                                    showSelectAddress(false)
                                    navigation.navigate('Add Address')
                                }}>
                                    <Text style={{fontWeight: 'bold', color: 'grey'}}>+ ADD ADDRESS</Text>
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
                        <Text style={{ marginTop: 10, marginBottom: 8, fontWeight: 'bold', fontSize: 14 }}>{Accounts.PersonalInfo.firstName + ' ' + Accounts.PersonalInfo.lastName}</Text>
                        <Text>{Accounts.Address.addressLine1 + ', ' + Accounts.Address.addressLine2}</Text>
                        <Text>{Accounts.Address.city + ', ' + Accounts.Address.zipCode + ', ' + Accounts.Address.market}</Text>
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

const mapStateToProps = ({ tote }) => {
    return {
        toteItems: tote
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ToteAction: bindActionCreators(ToteAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ToteScreen)

