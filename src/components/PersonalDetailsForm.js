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

const PresonalDetailsForm = (props) => {
    const { details } = props
    return (
        <View style={styles.accountBodyContainer}>
            <Text style={styles.accountTextConatiner}>Email</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.email}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>First Name</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.firstName}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Last Name</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.lastName}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Date of birth</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.dateOfBirth}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Phone number</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.phoneNumber}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Gender</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.gender}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Zip Code</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.zipCode}
                // onChangeText={text => onChangeText(text)}
            />
            <Text style={styles.accountTextConatiner}>Market</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={details.market}
                // onChangeText={text => onChangeText(text)}
            />
            <RadioButton items={defaultAddress} />
        </View>
    )
}
export default PresonalDetailsForm