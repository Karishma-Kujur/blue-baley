import React, { useState } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import NoImage from '../assets/images/noImage.png'
import styles from '../assets/styles';
import * as ToteAction from '../actions/ToteAction';
import CustomDialog from '../components/shared/CustomDialog';

const CardItem = ({
    actions,
    description,
    images,
    matches,
    name,
    onPressBagIt,
    onPressRight,
    variant,
    price,
    productId
}) => {
    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: fullWidth - 20,
            height: 420
        }
    ];

    const [showSize, changeShowSize] = useState(false)
    const [quantity, changeQuantity] = useState(1)
    const [showAlert, changeShowAlert] = useState({ show: false })
    const [dialogMessage, setDialogMessage] = useState('')
    const [dialog, showDialog] = useState(false)
    const image = images.length > 0 ? images[0] : ''
    const sizes = ['XS', 'S', 'M', 'L', 'XL']

    const handleOnClickSave = () => {
        const data = {
            "product_id": productId,
            "quantity": 1
        }
        ToteAction.addToTote(data)
            .then((result) => {
                setDialogMessage('Added to Bag!')
                showDialog(true)
                changeShowSize(false)
                setTimeout(() => {
                    showDialog(false)
                    setDialogMessage('')
                }, 2000);
            })
            .catch((error) => {
                changeShowSize(false)
                setDialogMessage('Error occured while adding to bag!')
                showDialog(true)
                setTimeout(() => {
                    showDialog(false)
                    setDialogMessage('')
                }, 2000);
            })
    }

    return (
        <View style={styles.containerCardItem}>
            <CustomDialog modalVisible={dialog} message={dialogMessage} />
            <ScrollView>
                <Image source={image ? {
                    uri: image,
                } : NoImage}
                    style={imageStyle} />
                <Text style={styles.nameCardItem}>{name}</Text>
                <Text style={styles.priceCardItem}>{'$ ' + (price || '20')}</Text>

                {description && (
                    <Text style={styles.descriptionCardItem}>{description}</Text>
                )}

                <View style={styles.fullHeight}>
                    {showSize && (
                        <View style={styles.actionsCardItem} >
                            <View style={styles.button}>
                                <Text style={styles.flash}>Select Size : </Text>
                            </View>
                            <View style={{ width: 220, height: 50, borderWidth: 1, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                {sizes.map((size) => {
                                    return <TouchableOpacity onPress={handleOnClickSave} style={styles.sizeButton}>
                                        <Text>{size}</Text>
                                    </TouchableOpacity>
                                })}
                            </View>
                        </View>
                    )}

                    {/* ACTIONS */}
                    {!showSize && actions && (
                        <View style={styles.actionsCardItem}>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                changeShowSize(true)
                            }}>
                                <Text style={styles.flash}>
                                    BAG it
                        </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setDialogMessage('Added to Favorites!')
                                showDialog(true)
                                changeShowSize(false)
                                setTimeout(() => {
                                    showDialog(false)
                                    setDialogMessage('')
                                }, 2000);
                            }}
                                style={styles.button}
                            >
                                <Text style={styles.flash}>
                                    SAVE it
                        </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setDialogMessage('Not your Style? Got it!')
                                showDialog(true)
                                changeShowSize(false)
                                setTimeout(() => {
                                    showDialog(false)
                                    setDialogMessage('')
                                }, 2000);
                            }}
                            style={styles.button}>
                                <Text style={styles.flash}>
                                    LOSE it
                        </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {images.length > 1 &&
                    <View>
                        {images.map((item, index) => {
                            if (index !== 0) {
                                return (
                                    <View style={{ paddingBottom: 2 }}>
                                        <Image source={item ? {
                                            uri: item,
                                        } : NoImage}
                                            style={imageStyle} />
                                    </View>
                                )
                            }
                        })}
                    </View>
                }
                {/* <View style={imageStyle}>
                <SliderBox
                    images={images}
                   autoplay
                    circleLoop
                    sliderBoxHeight={420}
                    imageLoadingColor="#2196F3"
                    ImageComponentStyle={{borderRadius: 15, width: fullWidth - 80, marginTop: 5}}
                    onCurrentImagePressed={index =>
                        console.warn(`image ${index} pressed`)
                    }
                />
            </View> */}
                {/* <View style={{ height: 420, marginBottom: 100 }}>
                    <Gallery
                        style={{ flex: 1, backgroundColor: 'black' }}
                        images={[
                            { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                            { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                            { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                            { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                        ]}
                    />
                </View> */}
            </ScrollView>
        </View>
    );
};

export default CardItem
