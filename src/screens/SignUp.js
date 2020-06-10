import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text, Platform, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/shared/Button'
import TextInput from '../components/shared/TextInput'
import Link from '../components/shared/Link'
import styles from '../assets/styles';
import * as SignupAction from '../actions/SignupAction';
import * as LoginApi from '../api/Login';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const SignUpScreen = (props) => {
    const { navigation } = props
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [formError, setFormError] = useState(false)
    const [spinner, setLoader] = useState('')

    const validator = {
        firstName: {
            type: 'string',
            field: 'firstName',
            onError: setFirstNameError,
            onChange: setFirstName,
        },
        lastName: {
            type: 'string',
            field: 'lastName',
            onError: setLastNameError,
            onChange: setLastName,
        },
        email: {
            type: 'string',
            field: 'email',
            onError: setEmailError,
            onChange: setEmail,
            extras: {
                email: true
            }
        },
        password: {
            type: 'string',
            field: 'password',
            onError: setPasswordError,
            onChange: setPassword,
            extras: {
            }
        }
    }

    const validateInput = (value, setError) => {
        if (value === '') {
            setError(true)
            setFormError(true)
        }
    }

    const handleSignup = () => {
        validateInput(email, setEmailError);
        validateInput(firstName, setFirstNameError);
        validateInput(lastName, setLastNameError);
        validateInput(password, setPasswordError);

        if (formError)
            return null;
        const data = {
            // "email": email,
            // "first_name": firstName,
            // "last_name": lastName,
            "username": email,
            "password": password
        }
        setLoader(true)
        LoginApi.login(data)
            .then((result) => {
                setLoader(false)
                // dispatch(toaster.success('You are successfully registered. Please check you email to receive the invite'))
                navigation.navigate('Survey')
            })
            .catch((error) => {
                setLoader(false)
                // dispatch(toaster.error(error.message))
            })
        // SignupAction.signupUser(data)
        //     .then((result) => {
        //         setLoader(false)
        //         // dispatch(toaster.success('You are successfully registered. Please check you email to receive the invite'))
        //         navigation.navigate('Survey')
        //     })
        //     .catch((error) => {
        //         setLoader(false)
        //         // dispatch(toaster.error(error.message))
        //     })
    }

    const onChangeText = (value, validatorObj, onChange) => {
        if (validatorObj) {
            if (value !== '') {
                validatorObj.onError(false)
            }
            else {
                validatorObj.onError(true)
            }
            validatorObj.onChange(value)
            // validateFormField(value, validatorObj.field, validatorObj.type, newError, validatorObj.extras);
            // updateErrorObject({...errorObject, ...newError});
        } else {
            onChange(value)
        }

    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior="padding" enabled>
            <View style={styles.formContainer}>
                <Spinner
                    visible={spinner}
                />
                <View style={styles.top}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>
                <ScrollView>
                    <TextInput
                        name="First Name"
                        onChangeText={text => onChangeText(text, validator.firstName)}
                        value={firstName}
                    />
                    {firstNameError && <Text style={styles.errorMessage}>*Please Enter your First Name</Text>}
                    <TextInput
                        name="Last Name"
                        onChangeText={text => onChangeText(text, validator.lastName)}
                        value={lastName}
                    />
                    {lastNameError && <Text style={styles.errorMessage}>*Please Enter your Last Name</Text>}
                    <TextInput
                        name="Email"
                        onChangeText={text => onChangeText(text, validator.email)}
                        value={email}
                    />
                    {emailError && <Text style={styles.errorMessage}>*Please Enter your Email Id</Text>}
                    <TextInput
                        name="Password"
                        mode="password"
                        onChangeText={text => onChangeText(text, validator.password)}
                        value={password}
                    />
                    {passwordError && <Text style={styles.errorMessage}>*Please Enter your Password</Text>}
                    <TextInput
                        name="Confirm Password"
                        mode="password"
                        onChangeText={text => onChangeText(text, validator.password)}
                        value={password}
                    />
                    {confirmPasswordError && <Text style={styles.errorMessage}>*Please Re Enter your Password</Text>}
                </ScrollView>
                <View style={styles.formButton}>
                    <Button label="Begin Survey" onPress={handleSignup} />
                    <View style={styles.linkContainer}>
                        <Text style={styles.label}>Existing User? </Text>
                        <Link label="Login" onPress={() => navigation.navigate('Login')} />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>

    )
}

export default SignUpScreen
