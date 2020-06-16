import React, { useState } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import CustomPicker from '../components/shared/CustomPicker'
import styles from '../assets/styles';
import NoImage from '../assets/images/noImage.png'
import AddToFavorite from '../assets/images/favorite.jpeg'
import AddToBag from '../assets/images/bag.jpeg'
import * as ToteAction from '../actions/ToteAction';

const OrderedItem = ({
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

    const imageStyle = [
        {
            width: fullWidth / 3 - 30,
            height: 100,
            margin: 2
        }
    ];

    return (
        <View style={styles.toteCardItem}>
            <View style={{ padding: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ backgroundColor: 'green', borderRadius: 50, width: 12, height: 12, marginRight: 10 }}></View>
                    <Text style={{ fontWeight: 'bold' }}>DELIVERED</Text>
                </View>
                <Text style={{ color: 'grey', fontSize: 12 }}>Order # 123456789</Text>
            </View>
            <ScrollView
                horizontal={true}
                // contentContainerStyle={{ width: `${100 * 0.3}%` }}
                showsHorizontalScrollIndicator={false}
                // scrollEventThrottle={200}
                // decelerationRate="fast"
                pagingEnabled
            >
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
            </ScrollView>
            <View style={{ padding: 5 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                    <Text style={{ color: 'grey'}}>13 Items in Total:</Text>
                    <Text style={{fontWeight: 'bold'}}>US$115.89</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity>
                        <View style={{ borderWidth: 1, padding: 3, marginRight: 5 }}>
                            <Text>Track</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ borderWidth: 1, padding: 3, marginRight: 5 }}>
                            <Text>Return Item</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ borderWidth: 1, padding: 3, backgroundColor: 'black' }}>
                            <Text style={{ color: 'white' }}>Review</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default OrderedItem
