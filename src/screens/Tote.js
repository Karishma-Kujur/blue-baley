import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image, Linking } from 'react-native'
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import ToteItem from './ToteItem'
import Avatar from '../assets/images/avatar.jpeg'
import * as ToteAction from '../actions/ToteAction';
import * as ToteApi from '../api/Tote'
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const ToteScreen = (props) => {
    const { navigation, ToteAction, toteItems, user } = props
    const [spinner, setLoader] = useState('')
    const [addAddress, setAddAddress] = useState(false)
    const [selectAddress, showSelectAddress] = useState(false)
    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
            borderRadius: 15
        }
    ];

    const getTotes = () => {
        setLoader(true)
        ToteApi.getTotes()
            .then((result) => {
                setLoader(false)
                ToteAction.setTotes(result)

            })
            .catch((error) => {
                setLoader(false)
                Alert.alert('Invalid User name or Password', 'Please enter valid user name and password')
            })
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        getTotes()
    }, [isFocused])

    const handleRefreshTote = () => {
        getTotes()
    }


    const handleProceedToShipping = () => {
        navigation.navigate('Checkout')
    }

    return (
        <View style={styles.containerMatches}>
            <Spinner
                visible={spinner}
            />
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                    <Image source={Avatar} style={imageStyle} />
                </TouchableOpacity>
                <Text style={styles.title}>Tote</Text>
            </View>
            <ScrollView>
                <FlatList
                    data={toteItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ToteItem
                            id={item.id}
                            productId={item.productId}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            quantity={item.quantity}
                            toteEdited={handleRefreshTote}
                        />
                    )}
                />

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Price Details:</Text>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>{"Price (" + toteItems.length + " items)"}</Text>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>{"Delivery Fee"}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{"Total Amount"}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <Button label="Proceed to shipping" onPress={handleProceedToShipping} />
            </View>
        </View>
    )
}

const mapStateToProps = ({ tote, user }) => {
    return {
        toteItems: tote,
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ToteAction: bindActionCreators(ToteAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ToteScreen)

