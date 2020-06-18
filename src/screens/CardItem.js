import React, { useState } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import NoImage from '../assets/images/02.jpg'
import Similar from '../assets/images/similar.png';
import styles from '../assets/styles';
import * as ToteAction from '../actions/ToteAction';
import CustomDialog from '../components/shared/CustomDialog';
import PopupDialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';

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
    const fullHeight = Dimensions.get('window').height;
    const imageStyle = [
        {
            borderRadius: 8,
            width: fullWidth - 20,
            height: fullHeight - 350
        }
    ];

    const similarImageStyle = [
        {
            width: fullWidth / 2 - 20,
            height: 200,
            margin: 2,
            borderRadius: 8,
        }
    ];

    const similarIconStyle = [
        {
            width: 25,
            height: 25
        }
    ]

    const [showSize, changeShowSize] = useState(false)
    const [quantity, changeQuantity] = useState(1)
    const [showAlert, changeShowAlert] = useState({ show: false })
    const [dialogMessage, setDialogMessage] = useState('')
    const [dialog, showDialog] = useState(false)
    const [suggestionDialog, showSuggestionDialog] = useState(false)
    const image = images.length > 0 ? images[0] : ''
    const sizes = ['XS', 'S', 'M', 'L', 'XL']

    const handleOnClickSave = () => {
        setDialogMessage('Added to Favorites!')
        showDialog(true)
        changeShowSize(false)
        setTimeout(() => {
            showDialog(false)
            setDialogMessage('')
        }, 2000);
    }

    const handleOnClickBag = () => {
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
                <View style={{ height: fullHeight - 150 }}>
                    <Image source={image ? {
                        uri: image,
                    } : NoImage}
                        style={imageStyle} />
                    <TouchableOpacity style={{ bottom: 40, left: 10, backgroundColor: 'white', width: 35, padding: 5, borderRadius: 18 }}
                        onPress={() => showSuggestionDialog(true)}
                    >
                        <Image source={Similar} style={similarIconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.nameCardItem}>{name}</Text>
                    <Text style={styles.priceCardItem}>{'$ ' + (price || '20')}</Text>

                    {description && (
                        <Text style={styles.descriptionCardItem}>{description}</Text>
                    )}
                </View>
                <View style={{ height: 80 }}>
                    {showSize && (
                        <View style={styles.actionsCardItem} >
                            <View style={styles.button}>
                                <Text style={styles.flash}>Select Size : </Text>
                            </View>
                            <View style={{ width: 220, height: 50, borderWidth: 1, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                {sizes.map((size) => {
                                    return <TouchableOpacity onPress={handleOnClickBag} style={styles.sizeButton}>
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

                            <TouchableOpacity onPress={handleOnClickSave}
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
                <PopupDialog
                    visible={suggestionDialog}
                    containerStyle={{ justifyContent: 'flex-end' }}
                    height={280}
                    width={fullWidth}
                    onTouchOutside={() => showSuggestionDialog(false)
                    }
                    dialogTitle={<DialogTitle title="Similar Products" />}
                >
                    <DialogContent>
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
                                style={similarImageStyle} />
                            <Image source={image ? {
                                uri: image,
                            } : NoImage}
                                style={similarImageStyle} />
                            <Image source={image ? {
                                uri: image,
                            } : NoImage}
                                style={similarImageStyle} />
                            <Image source={image ? {
                                uri: image,
                            } : NoImage}
                                style={similarImageStyle} />
                            <Image source={image ? {
                                uri: image,
                            } : NoImage}
                                style={similarImageStyle} />
                            <Image source={image ? {
                                uri: image,
                            } : NoImage}
                                style={similarImageStyle} />
                            <Image source={image ? {
                                uri: image,
                            } : NoImage}
                                style={similarImageStyle} />
                        </ScrollView>
                    </DialogContent>
                </PopupDialog>
            </ScrollView>
        </View>
    );
};

export default CardItem
