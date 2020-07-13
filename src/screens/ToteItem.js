import React, { useState } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Chevron } from 'react-native-shapes';
import CustomPicker from '../components/shared/CustomPicker'
import styles from '../assets/styles';
import NoImage from '../assets/images/noImage.png'
import AddToFavorite from '../assets/images/favorite.jpeg'
import AddToBag from '../assets/images/bag.jpeg'
import * as ToteAction from '../actions/ToteAction'
import * as ProductsApi from '../api/Products';
import CustomDialog from '../components/shared/CustomDialog'
import RNPickerSelect from 'react-native-picker-select'

const sizes = [
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' }
]

const colors = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' }
]

const quantities = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' }
]

const ToteItem = ({
    image,
    matches,
    name,
    isFavorite,
    price,
    quantity,
    id,
    productId,
    user,
    attributes,
    toteEdited
}) => {
    const [selectedQuantity, changeQuantity] = useState(quantity)
    const [showDialog, changeShowDialog] = useState(false)
    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const favoriteImageStyle = [
        {
            width: 15,
            height: 15
        }
    ];
    const bagImageStyle = [
        {
            width: 20,
            height: 20
        }
    ]
    const imageStyle = [
        {
            borderRadius: 8,
            width: fullWidth / 2 - 30,
            height: 170,
            marginRight: 10
        }
    ];

    const toteContainer = [
        {
            flex: 1,
            flexDirection: 'row'
        }
    ]

    const descriptionStyle = [
        {
            width: fullWidth / 2 - 30
        }
    ]

    const handleEditToteProduct = (item) => {
        if (item.value === quantity) return;
        const data = {
            cart_item_key: id,
            quantity: item.value
        }
        ToteAction.editTote(data)
            .then((result) => {
                changeQuantity(item.value)
                toteEdited()
            })
            .catch((error) => {
                Alert.alert('Invalid User name or Password', 'Please enter valid user name and password')
            })
    }

    const handleMoveToBag = () => {
        const data = {
            "product_id": productId,
            "quantity": 1
        }
        ToteAction.addToTote(data)
            .then((result) => {
                ProductsApi.removeFromFavorites(productId, user.id)
                    .then((result) => {
                        toteEdited()
                    })
                    .catch((error) => {
                    })
            })
            .catch((error) => {
            })
    }

    const handleMoveToFavorites = () => {
        const data = {
            cart_item_key: id,
            quantity: 0
        }
        ToteAction.editTote(data)
            .then((result) => {
                ProductsApi.saveProducts({ productId: productId })
                    .then((result) => {
                        toteEdited()
                    })
                    .catch((error) => {
                    })
            })
            .catch((error) => {
            })
    }

    return (
        <View style={styles.toteCardItem}>
            <View style={toteContainer}>
                <View>
                    <Image source={image ? {
                        uri: image,
                    } : NoImage}
                        style={imageStyle} />
                </View>
                <View style={descriptionStyle}>
                    <Text style={styles.nameToteItem}>{name}</Text>
                    <Text style={styles.priceToteItem}>{'$ ' + (price || '0')}</Text>
                    {isFavorite &&
                        <View style={styles.favoriteActionContainer}>
                            <View style={{ borderWidth: 1, padding: 5 }}>
                                <TouchableOpacity onPress={handleMoveToBag}>
                                    <Image source={AddToBag} style={bagImageStyle} />
                                </TouchableOpacity>
                            </View>
                        </View>}
                </View>
            </View>
            <View>
                {!isFavorite &&
                    <View style={styles.toteActionContainer}>
                        <View style={{ borderWidth: 1, padding: 5 }}>
                            <TouchableOpacity onPress={handleMoveToFavorites}>
                                <Image source={AddToFavorite} style={favoriteImageStyle} />
                            </TouchableOpacity>
                        </View>
                        {sizes.length &&
                            <View>
                                <Text>Size</Text>
                                <View>
                                    <RNPickerSelect
                                        value={sizes[0]}
                                        onValueChange={(value) => console.log(value)}
                                        items={sizes}
                                        Icon={() => {
                                            return <Chevron size={1} color="gray" />;
                                        }}
                                        // useNativeAndroidPickerStyle={false}
                                        style={{
                                            inputIOS: {
                                                fontSize: 16,
                                                paddingVertical: 2,
                                                paddingHorizontal: 5,
                                                borderWidth: 1,
                                                color: 'black',
                                                paddingRight: 20, // to ensure the text is never behind the icon
                                            },
                                            inputAndroid: {
                                                backgroundColor: 'transparent',
                                            },
                                            iconContainer: {
                                                top: 10,
                                                right: 7
                                            },
                                        }}
                                    />
                                </View>
                            </View>
                        }
                        {colors.length &&
                            <View>
                                <Text>Color</Text>
                                <View>
                                    <RNPickerSelect
                                        value={colors[0]}
                                        onValueChange={(value) => console.log(value)}
                                        items={colors}
                                        Icon={() => {
                                            return <Chevron size={1} color="gray" />;
                                        }}
                                        style={{
                                            inputIOS: {
                                                fontSize: 16,
                                                paddingVertical: 2,
                                                paddingHorizontal: 5,
                                                borderWidth: 1,
                                                color: 'black',
                                                paddingRight: 20, // to ensure the text is never behind the icon
                                            },
                                            inputAndroid: {
                                                backgroundColor: 'transparent',
                                            },
                                            iconContainer: {
                                                top: 10,
                                                right: 7
                                            },
                                        }}
                                    />
                                </View>
                            </View>
                        }
                        {quantities.length &&
                            <View>
                                <Text>Qty</Text>
                                <View>
                                    <RNPickerSelect
                                        value={quantities[0]}
                                        onValueChange={(value) => handleEditToteProduct(value)}
                                        items={quantities}
                                        Icon={() => {
                                            return <Chevron size={1} color="gray" />;
                                        }}
                                        style={{
                                            inputIOS: {
                                                fontSize: 16,
                                                paddingVertical: 2,
                                                paddingHorizontal: 5,
                                                borderWidth: 1,
                                                color: 'black',
                                                paddingRight: 20, // to ensure the text is never behind the icon
                                            },
                                            inputAndroid: {
                                                backgroundColor: 'transparent',
                                            },
                                            iconContainer: {
                                                top: 10,
                                                right: 7
                                            },
                                        }}
                                    />
                                </View>
                            </View>
                        }
                    </View>}

            </View>
        </View>
    );
};

export default ToteItem
