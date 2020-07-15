import React, { useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import AddressForm from '../components/AddressForm'
import Back from '../assets/images/back.png'
import Button from '../components/shared/Button'
import * as UserApi from '../api/User'
import * as UserAction from '../actions/UserAction'

const { width, height } = Dimensions.get("window");

const AddAddress = (props) => {
    const { navigation, user, UserAction } = props
    const [address, setAddress] = useState(user.billing)

    const changeAddress = (field, value) => {
        let newAddress = { ...address }
        newAddress[field] = value
        setAddress(newAddress)
    }

    const handleSaveAddress = () => {
        let data = {
            billing: {
                first_name: address.first_name,
                last_name: address.last_name,
                email: address.email,
                address_1: address.address_1,
                address_2: address.address_2,
                city: address.city,
                postcode: address.postcode,
                state: address.state,
                country: address.country,
                phone: address.phone
            }
        }
        UserApi.updateUserDetails(user.id, data)
            .then((result) => {
                UserAction.setUser(result)
                navigation.navigate('Checkout')

            })
            .catch((error) => {
            })

    }

    return (
        <View style={{ marginTop: 40, height: height - 50 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Checkout')
                }}
                    style={{ marginLeft: 20 }}>
                    <Image source={Back} style={{ width: 24, height: 24, borderRadius: 12 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20 }}>Add New Address</Text>
            </View>
            <View style={{height: height - 150}}>
                <AddressForm address={address} changeAddress={changeAddress} />
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingLeft: 10,
                paddingRight: 10,
                marginBottom: 20
            }}>
                <Button label="Add Address" onPress={handleSaveAddress} />
            </View>
        </View>
    )
}
const mapStateToProps = ({ user }) => {
    return {
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserAction: bindActionCreators(UserAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress) 