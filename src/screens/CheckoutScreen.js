import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image, Linking, Platform, Alert } from 'react-native';
import Button from '../components/shared/Button'
import Back from '../assets/images/back.png'
import Link from '../components/shared/Link'
import * as ProductApi from '../api/Products'
import Spinner from 'react-native-loading-spinner-overlay'
import { RadioButton, Title } from 'react-native-paper';
import InAppBrowser from 'react-native-inappbrowser-reborn'
import DeepLinking from 'react-native-deep-linking'

const { width, height } = Dimensions.get("window");

const CheckoutScreen = (props) => {
    const { navigation, tote, user } = props
    const [spinner, setLoader] = useState(false)
    const [token, setToken] = useState(null)
    const [success, setSuccess] = useState(null)
    const [allowed, setAllowed] = useState(null)

    const handleUrl = (url) => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                DeepLinking.evaluateUrl(url)
            }
        })
    }


    const addRoutesToDeepLinking = () => {
        DeepLinking.addScheme('https://')

        DeepLinking.addRoute('/testurl.com/#/sign-in', (response) => {
            navigation.navigate("Order Placed")
        })
    }

    useEffect(() => {
        addRoutesToDeepLinking()
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                navigate(url);
            });
        } else {
            Linking.addEventListener('url', handleUrl);
        }
        return () => {
            Linking.removeEventListener('url', handleUrl);
        }
    }, [])

    const openLink = async () => {
        try {
            const url = `https://www.departmynt.co/wp-json/user/getUser?username=${user.userName}&password=${user.password}&order_key=wc_order_GchNmsD3MoD8Q&orderId=674`
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    // modalPresentationStyle: 'overFullScreen',
                    // modalTransitionStyle: 'partialCurl',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                    headers: {
                        'my-custom-header': 'my custom header value'
                    }
                })
                Alert.alert(JSON.stringify(result))
            }
            else
                Linking.openURL(url)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const handleDeliveryMethodPress = () => {
        let data = {
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
            line_items: []
        }
        tote.forEach((item) => {
            data.line_items.push({
                product_id: item.productId,
                quantity: item.quantity
            })
        })
        ProductApi.placeOder(data)
            .then((result) => {
                ProductApi.clearTote()
                    .then((resultData) => {
                        openLink(resultData);
                        setLoader(false)
                        navigation.navigate("Order Placed")
                    })
                    .catch((error) => {
                        setLoader(false)
                    })
            })
            .catch((error) => {
                setLoader(false)
            })
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
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 8, fontWeight: 'bold', fontSize: 14 }}>{user.firstName + ' ' + user.lastName}</Text>
                    {user.billing && user.billing.address_1 && <Text>{user.billing.address_1 + ', ' + user.billing.address_2}</Text>}
                    <Text>{user.billing.city + ', ' + user.billing.postcode + ', ' + user.billing.state}</Text>
                    <Text style={{ marginTop: 10 }}>{'Mobile: ' + user.billing.phone}</Text>
                </View>
            </ScrollView>
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingLeft: 10,
                paddingRight: 10
            }}>
                <Button label="Proceed" onPress={() => openLink()} />
            </View>
        </View>
    )
}
const mapStateToProps = ({ tote, user, payment }) => {
    return {
        tote,
        user
    };
}

export default connect(mapStateToProps, null)(CheckoutScreen)