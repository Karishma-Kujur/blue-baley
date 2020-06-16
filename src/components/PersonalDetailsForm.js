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
    const [email, changeEmail] = useState(details.email)
    const [firstName, changeFirstName] = useState(details.firstName)
    const [lastName, changeLastName] = useState(details.lastName)
    const [dateOfBirth, changeDateOfBirth] = useState(details.dateOfBirth)
    const [phoneNumber, changePhoneNumber] = useState(details.phoneNumber)
    const [gender, changeGender] = useState(details.gender)
    return (
        <View style={styles.accountBodyContainer}>
            <Text style={styles.accountTextConatiner}>Email</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={email}
                onChangeText={text => changeEmail(text)}
            />
            <Text style={styles.accountTextConatiner}>First Name</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={firstName}
                onChangeText={text => changeFirstName(text)}
            />
            <Text style={styles.accountTextConatiner}>Last Name</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={lastName}
                onChangeText={text => changeLastName(text)}
            />
            <Text style={styles.accountTextConatiner}>Date of birth</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={dateOfBirth}
                onChangeText={text => changeDateOfBirth(text)}
            />
            <Text style={styles.accountTextConatiner}>Phone number</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={phoneNumber}
                onChangeText={text => changePhoneNumber(text)}
            />
            <Text style={styles.accountTextConatiner}>Gender</Text>
            <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={gender}
                onChangeText={text => changeGender(text)}
            />
        </View>
    )
}
export default PresonalDetailsForm