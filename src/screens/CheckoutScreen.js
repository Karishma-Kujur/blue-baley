import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from '../assets/styles';
import Button from '../components/shared/Button'
import Back from '../assets/images/back.png'
import Link from '../components/shared/Link'
import * as ProductApi from '../api/Products'
import * as PaymentApi from '../api/Payment'
import * as PaymentAction from '../actions/PaymentAction'
import stripe from 'tipsi-stripe'
import Spinner from 'react-native-loading-spinner-overlay'
import { RadioButton, Title } from 'react-native-paper';

const { width, height } = Dimensions.get("window");

const CheckoutScreen = (props) => {
    const { navigation, tote, user, PaymentAction, paymentMethods } = props
    const [spinner, setLoader] = useState(false)
    const [token, setToken] = useState(null)
    const [success, setSuccess] = useState(null)
    const [allowed, setAllowed] = useState(null)
    const [checked, setChecked] = useState(null)

    const imageStyle = [
        {
            borderRadius: 8,
            width: width / 2 - 30,
            height: 170,
            marginRight: 10
        }
    ];

    const getPaymentGateways = () => {
        PaymentApi.getPaymentGateways()
            .then((result) => {
                setLoader(false)
                PaymentAction.setPaymentMethods(result)

            })
            .catch((error) => {
                setLoader(false)
            })
    }

    const publishKey = async () => {
        stripe.setOptions({
            publishableKey: 'pk_test_51H2xnHF7LMnQF33B4WzDRfeGv8WJUBGNM9wv1zzxtZpiKKXUlbKYoztWftXdYCAWtUnIO0Qf2Tv51pIO9VHdbENo00q7tM4JmZ'
        })
        const allowed = await stripe.deviceSupportsNativePay()
        setAllowed(allowed)
    }

    useEffect(() => {
        publishKey()
        getPaymentGateways()
    }, [])

    const handleDeliveryMethodPress = (paymentMethod) => {
        let data = {
            payment_method: paymentMethod.id,
            payment_method_title: paymentMethod.method_title,
            set_paid: false,
            billing: {
                first_name: user.billing.first_name,
                last_name: user.billing.last_name,
                address_1: user.billing.address_1,
                address_2: user.billing.address_2,
                city: user.billing.city,
                state: user.billing.state,
                postcode: user.billing.postcode,
                country: user.billing.country,
                email: user.billing.email,
                phone: user.billing.phone
            },
            shipping: {
                first_name: user.billing.first_name,
                last_name: user.billing.last_name,
                address_1: user.billing.address_1,
                address_2: user.billing.address_2,
                city: user.billing.city,
                state: user.billing.state,
                postcode: user.billing.postcode,
                country: user.billing.country,
            },
            line_items: [],
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: 10
                }
            ]
        }
        tote.forEach((item) => {
            data.line_items.push({
                product_id: item.productId,
                quantity: item.quantity
            })
        })
        ProductApi.placeOder(data)
            .then((result) => {
                setLoader(false)
                navigation.navigate("Order Placed")

            })
            .catch((error) => {
                setLoader(false)
            })
    }

    const handleCardPayPress = async () => {
        try {
            setLoader(true)
            setToken(null)
            const newToken = await stripe.paymentRequestWithCardForm({
                // Only iOS support this options
                smsAutofillDisabled: true,
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                    billingAddress: {
                        name: user.billing.firstName,
                        line1: user.billing.address_1,
                        line2: user.billing.address_2,
                        city: user.billing.city,
                        state: user.billing.state,
                        country: 'Estonia',
                        postalCode: user.billing.postcode,
                        email: 'admin@enappd.com',
                    },
                },
            })
            setLoader(false)
            setToken(newToken)
        } catch (error) {
            setLoader(false)
        }
    }

    const doPayment = async () => {
        // Use firebase serve for local testing if you don't have a paid firebase account
        const data = {
            payment_method: 'stripe',
            order_id: '543',
            payment_token: token.tokenId
        }
        PaymentApi.doPayment(data)
            .then((result) => {
                setLoader(false)
                navigation.navigate("Order Placed")

            })
            .catch((error) => {
                setLoader(false)
            })
    }

    const handleApplePayPress = async () => {
        try {
            setLoader(true)
            setToken(null)
            const newToken = await stripe.paymentRequestWithNativePay({
                // requiredBillingAddressFields: ['all'],
                // requiredShippingAddressFields: ['all'],
                shippingMethods: [{
                    id: 'fedex',
                    label: 'FedEX',
                    detail: 'Test @ 10',
                    amount: '10.00',
                }],
            },
                [{
                    label: 'Whisky',
                    amount: '50.00',
                }, {
                    label: 'Vine',
                    amount: '60.00',
                }, {
                    label: 'Tipsi',
                    amount: '110.00',
                }])
            setLoader(false)
            setToken(newToken)

            await stripe.completeNativePayRequest()
            setStatus('Apple Pay payment completed')
        } catch (error) {
            setLoader(false)
            setStatus(`Error: ${error.message}`)
        }
    }


    return (
        <View style={{ marginTop: 40, height: height - 50 }}>
            <Spinner
                visible={spinner}
            />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('View Tote')
                }}
                    style={{ marginLeft: 20 }}>
                    <Image source={Back} style={{ width: 24, height: 24, borderRadius: 12 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20 }}>Payment</Text>
            </View>
            <ScrollView>
                <View style={{
                    padding: 20
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Title style={{ justifyContent: 'center' }}>Delivery Address</Title>
                        <Link label="Edit" onPress={() => navigation.navigate('Add Address')} />
                        {/* <TouchableOpacity onPress={() => {
                            navigation.navigate('Add Address')
                        }}>
                            <Text>Edit</Text>
                        </TouchableOpacity> */}
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 8, fontWeight: 'bold', fontSize: 14 }}>{user.firstName + ' ' + user.lastName}</Text>
                    {user.billing && user.billing.address_1 && <Text>{user.billing.address_1 + ', ' + user.billing.address_2}</Text>}
                    <Text>{user.billing.city + ', ' + user.billing.postcode + ', ' + user.billing.state}</Text>
                    <Text style={{ marginTop: 10 }}>{'Mobile: ' + user.billing.phone}</Text>
                    <Title style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>Payment Methods</Title>
                    {paymentMethods.map((data) =>
                        <TouchableOpacity onPress={() => {
                            setChecked(data)
                        }}>
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                <View style={{
                                    height: 24,
                                    width: 24,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: '#000',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {checked && checked.id === data.id ?
                                        <View style={{
                                            height: 12,
                                            width: 12,
                                            borderRadius: 6,
                                            backgroundColor: '#000',
                                        }} />
                                        : null
                                    }
                                </View>
                                <Text style={{ marginLeft: 20, fontSize: 16 }}>{data.method_title}</Text>

                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingLeft: 10,
                paddingRight: 10
            }}>


                {!token ? <Button label="Proceed" onPress={() => handleCardPayPress()} />
                    :
                    <Button label="Buy Now" onPress={() => doPayment()} />
                }
            </View>
        </View>
    )
}
const mapStateToProps = ({ tote, user, payment }) => {
    return {
        tote,
        user,
        paymentMethods: payment.paymentMethods
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        PaymentAction: bindActionCreators(PaymentAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)