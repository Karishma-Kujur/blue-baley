import React, { useState } from 'react'
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import RadioButton from '../components/shared/RadioButton'
import styles from '../assets/styles';

const defaultAddress = [
    {
        id: 1,
        answer: 'Use as Default'
    }
]

const AddressForm = (props) => {
    const { details } = props
    const [addressLine1, changeAddressLine1] = useState((details && details.addressLine1) || '')
    const [addressLine2, changeAddressLine2] = useState((details && details.addressLine2) || '')
    const [city, changeCity] = useState((details && details.city) || '')
    const [zipCode, changeZipCode] = useState((details && details.zipCode) || '')
    const [market, changeMarket] = useState((details && details.market) || '')
    return (
        <View style={styles.accountBodyContainer}>

            <Text style={styles.accountTextConatiner}>Address line 1</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={addressLine1}
                onChangeText={text => changeAddressLine1(text)}
            />
            <Text style={styles.accountTextConatiner}>Address line 2</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={addressLine2}
                onChangeText={text => changeAddressLine2(text)}
            />
            <Text style={styles.accountTextConatiner}>City</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={city}
                onChangeText={text => changeCity(text)}
            />
            <Text style={styles.accountTextConatiner}>Zip code</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={zipCode}
                onChangeText={text => changeZipCode(text)}
            />
            <Text style={styles.accountTextConatiner}>Market</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={market}
                onChangeText={text => changeMarket(text)}
            />
        </View>
    )
}
export default AddressForm