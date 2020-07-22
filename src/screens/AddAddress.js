import React, {useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import AddressForm from '../components/AddressForm';
import Back from '../assets/images/back.png';
import Button from '../components/shared/Button';
import * as UserApi from '../api/User';
import * as UserAction from '../actions/UserAction';
import styles from '../assets/styles';

const {width, height} = Dimensions.get('window');

const AddAddress = (props) => {
  const {navigation, user, UserAction} = props;
  const [address, setAddress] = useState(user.billing);
  const [firstNameError, setFirstNameError] = useState(!user.billing.first_name || false);
  const [lastNameError, setLastNameError] = useState(!user.billing.last_name || false);
  const [emailError, setEmailError] = useState(!user.billing.email || false);
  const [address1Error, setAddress1Error] = useState(!user.billing.address_1 || false);
  const [address2Error, setAddress2Error] = useState(!user.billing.address_2 || false);
  const [cityError, setCityError] = useState(!user.billing.city || false);
  const [postCodeError, setPostCodeError] = useState(!user.billing.postcode || false);
  const [stateError, setStateError] = useState(!user.billing.state || false);
  const [countryError, setCountryError] = useState(!user.billing.country || false);
  const [phoneError, setPhoneError] = useState(!user.billing.phone || false);

  const changeAddress = (field, value) => {
    let newAddress = {...address};
    newAddress[field] = value;
    setAddress(newAddress);
  };

  const handleSaveAddress = () => {
      if(firstNameError || lastNameError || emailError || address1Error || address2Error || cityError || postCodeError ||stateError || countryError || phoneError )
      return null
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
        phone: address.phone,
      },
    };
    UserApi.updateUserDetails(user.id, data)
      .then((result) => {
        let userData = {
            ...result,
            userName: user.userName,
            password: user.password
        }
        UserAction.setUser(userData);
        navigation.navigate('Checkout');
      })
      .catch((error) => {});
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <View style={styles.containerMatches}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Image
              source={Back}
              style={{width: 24, height: 24, borderRadius: 12}}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Add New Address</Text>
        </View>
        <View style={{height: height - 150}}>
          <View style={styles.accountBodyContainer}>
            <ScrollView>
              <Text style={styles.accountTextConatiner}>First Name</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.first_name}
                onChangeText={(text) => {
                  if (text === '') {
                    setFirstNameError(true);
                  } else if (firstNameError) {
                    setFirstNameError(false);
                  }
                  changeAddress('first_name', text);
                }}
              />
              {firstNameError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your First Name
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Last Name</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.last_name}
                onChangeText={(text) => {
                  if (text === '') {
                    setLastNameError(true);
                  } else if (lastNameError) {
                    setLastNameError(false);
                  }
                  changeAddress('last_name', text);
                }}
              />
              {lastNameError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your Last Name
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Email</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.email}
                onChangeText={(text) => {
                  if (text === '') {
                    setEmailError(true);
                  } else if (emailError) {
                    setEmailError(false);
                  }
                  changeAddress('email', text);
                }}
              />
              {emailError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your Email
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Address line 1</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.address_1}
                onChangeText={(text) => {
                  if (text === '') {
                    setAddress1Error(true);
                  } else if (address1Error) {
                    setAddress1Error(false);
                  }
                  changeAddress('address_1', text);
                }}
              />
              {address1Error && (
                <Text style={styles.errorMessage}>
                  *Please Enter Address Line 1
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Address line 2</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.address_2}
                onChangeText={(text) => {
                  if (text === '') {
                    setAddress2Error(true);
                  } else if (address2Error) {
                    setAddress2Error(false);
                  }
                  changeAddress('address_2', text);
                }}
              />
              {address2Error && (
                <Text style={styles.errorMessage}>
                  *Please Enter Address Line 2
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>City</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.city}
                onChangeText={(text) => {
                  if (text === '') {
                    setCityError(true);
                  } else if (cityError) {
                    setCityError(false);
                  }
                  changeAddress('city', text);
                }}
              />
              {cityError && (
                <Text style={styles.errorMessage}>*Please Enter City Name</Text>
              )}
              <Text style={styles.accountTextConatiner}>Zip code</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.postcode}
                onChangeText={(text) => {
                  if (text === '') {
                    setPostCodeError(true);
                  } else if (postCodeError) {
                    setPostCodeError(false);
                  }
                  changeAddress('postcode', text);
                }}
              />
              {postCodeError && (
                <Text style={styles.errorMessage}>
                  *Please enter your postal code.
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>State</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.state}
                onChangeText={(text) => {
                  if (text === '') {
                    setStateError(true);
                  } else if (stateError) {
                    setStateError(false);
                  }
                  changeAddress('state', text);
                }}
              />
              {stateError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your State Name
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Country</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.country}
                onChangeText={(text) => {
                  if (text === '') {
                    setCountryError(true);
                  } else if (countryError) {
                    setCountryError(false);
                  }
                  changeAddress('country', text);
                }}
              />
              {countryError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your Country Name
                </Text>
              )}
              <Text style={styles.accountTextConatiner}>Phone</Text>
              <TextInput
                style={styles.accountTextInput}
                secureTextEntry={false}
                value={address.phone}
                onChangeText={(text) => {
                  if (text === '') {
                    setPhoneError(true);
                  } else if (phoneError) {
                    setPhoneError(false);
                  }
                  changeAddress('phone', text);
                }}
              />
              {phoneError && (
                <Text style={styles.errorMessage}>
                  *Please Enter your Phone Number
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottom}>
          <Button label="Add Address" onPress={handleSaveAddress} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = ({user}) => {
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UserAction: bindActionCreators(UserAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
