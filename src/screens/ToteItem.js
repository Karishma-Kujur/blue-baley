import React, { useState } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import CustomPicker from '../components/shared/CustomPicker'
import styles from '../assets/styles';
import NoImage from '../assets/images/noImage.png'
import AddToFavorite from '../assets/images/favorite.jpeg'
import AddToBag from '../assets/images/bag.jpeg'
import * as ToteAction from '../actions/ToteAction';

const sizes = [
    { label: 'S', vlaue: 'S' },
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
    actions,
    description,
    image,
    matches,
    name,
    onPressLeft,
    onPressRight,
    isFavorite,
    price,
    quantity,
    id,
    toteEdited
}) => {
    const [selectedQuantity, changeQuantity] = useState(quantity)
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

    const handleMoveToFavorites = () => {
        const data = {
            cart_item_key: id,
            quantity: 0
        }
        ToteAction.editTote(data)
            .then((result) => {
                toteEdited()
            })
            .catch((error) => {
                Alert.alert('Invalid User name or Password', 'Please enter valid user name and password')
            })
    }

    return (
        <View style={styles.toteCardItem}>
            <View style={toteContainer}>
                {/* IMAGE */}
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
                <View style={descriptionStyle}>
                    <Text style={styles.nameToteItem}>{name}</Text>
                    <Text style={styles.priceToteItem}>{price}</Text>
                    <Text style={styles.desceiptionToteItem}>{description}</Text>
                    {isFavorite && <View style={styles.toteActionContainer}>
                        <TouchableOpacity onPress={handleMoveToFavorites}>
                            <Image source={AddToBag} style={bagImageStyle} />
                        </TouchableOpacity>
                        </View>}
                    {!isFavorite && <View style={styles.toteActionContainer}>
                        <TouchableOpacity onPress={handleMoveToFavorites}>
                            <Image source={AddToFavorite} style={favoriteImageStyle} />
                        </TouchableOpacity>
                        <View>
                            <Text>Size</Text>
                            <CustomPicker
                                items={sizes}
                                onChange={() => { }}
                            />
                        </View>
                        <View>
                            <Text>Color</Text>
                            <CustomPicker
                                items={colors}
                                onChange={() => { }}
                            />
                        </View>
                        <View>
                            <Text>Qty</Text>
                            <CustomPicker
                                value={selectedQuantity}
                                items={quantities}
                                onChange={handleEditToteProduct}
                            />
                        </View>
                    </View>}
                </View>
            </View>

        </View>
    );
};

export default ToteItem
