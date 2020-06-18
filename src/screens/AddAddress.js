import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import AddressForm from '../components/AddressForm'
import Back from '../assets/images/back.png'
import Button from '../components/shared/Button'

const { width, height } = Dimensions.get("window");

const AddAddress = (props) => {
    const { navigation } = props
    return (
        <View style={{ marginTop: 40, height: height - 50 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('View Tote')
                }}
                    style={{ marginLeft: 20 }}>
                    <Image source={Back} style={{ width: 24, height: 24, borderRadius: 12 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20 }}>Add New Address</Text>
            </View>
            <ScrollView>
                <AddressForm />
            </ScrollView>
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingLeft: 10,
                paddingRight: 10
            }}>
                <Button label="Add Address" onPress={() => { navigation.navigate('Order Placed') }} />
            </View>
        </View>
    )
}
export default AddAddress