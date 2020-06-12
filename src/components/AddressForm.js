import React, { useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import RadioButton from '../components/shared/RadioButton'
import styles from '../assets/styles';

const defaultAddress = [
    {
        id: 1,
        answer: 'Use as Default'
    }
]

const AddressForm = (props) => {
    return (
        <View style={styles.accountBodyContainer}>
            <Text style={styles.accountTextConatiner}>Address line 1</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Address line 2</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>City</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Zip code</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Market</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                // onChangeText={text => onChangeText(text)}
            />
        </View>
    )
}
export default AddressForm