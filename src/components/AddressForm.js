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
    const { changeAddress, address } = props
    return (
        <View style={styles.accountBodyContainer}>

            <Text style={styles.accountTextConatiner}>Address line 1</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.address_1}
                onChangeText={text => changeAddress('address_1', text)}
            />
            <Text style={styles.accountTextConatiner}>Address line 2</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.address_2}
                onChangeText={text => changeAddress('address_2', text)}
            />
            <Text style={styles.accountTextConatiner}>City</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.city}
                onChangeText={text => changeAddress('city', text)}
            />
            <Text style={styles.accountTextConatiner}>Zip code</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.postcode}
                onChangeText={text => changeAddress('postcode', text)}
            />
            <Text style={styles.accountTextConatiner}>State</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.state}
                onChangeText={text => changeAddress('state', text)}
            />
            <Text style={styles.accountTextConatiner}>Country</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.country}
                onChangeText={text => changeAddress('country', text)}
            />
        </View>
    )
}
export default AddressForm