import React, {useState, useEffect} from 'react';
import {Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Chevron} from 'react-native-shapes';
import styles from '../assets/styles';
import NoImage from '../assets/images/noImage.png';
import AddToFavorite from '../assets/images/favorite.jpeg';
import AddToBag from '../assets/images/bag.jpeg';
import * as ToteApi from '../api/Tote';
import * as ProductsApi from '../api/Products';
import RNPickerSelect from 'react-native-picker-select';

const quantities = [
  {label: '0', value: '0'},
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9', value: '9'},
  {label: '10', value: '10'},
];

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
  toteEdited,
}) => {
  const [selectedQuantity, changeQuantity] = useState(quantity);
  const [selectedSize, changeSize] = useState('');
  const [selectedColor, changeColor] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [showDialog, changeShowDialog] = useState(false);
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const favoriteImageStyle = [
    {
      width: 15,
      height: 15,
    },
  ];
  const bagImageStyle = [
    {
      width: 20,
      height: 20,
    },
  ];
  const imageStyle = [
    {
      borderRadius: 8,
      width: fullWidth / 2 - 30,
      height: 170,
      marginRight: 10,
    },
  ];

  const toteContainer = [
    {
      flex: 1,
      flexDirection: 'row',
    },
  ];

  const descriptionStyle = [
    {
      width: fullWidth / 2 - 30,
    },
  ];

  useEffect(() => {
    if (attributes && attributes.length) {
      attributes.forEach((element) => {
        if (element.name === 'size') {
          setSizes(element.options);
          changeSize(element.options[0].value);
        } else if (element.name === 'color') {
          setColors(element.options);
          changeColor(element.options[0].value);
        }
      });
    }
  }, [attributes]);

  const handleEditToteProduct = (item) => {
    if (item === quantity) return;
    const data = {
      userId: user.id,
      productId: productId,
      quantity: item,
    };
    if (item === '0') {
      ToteApi.removeToteItem(data)
        .then((result) => {
          changeQuantity(item);
          toteEdited();
        })
        .catch((error) => {});
    } else {
      ToteApi.editTote(data)
        .then((result) => {
          changeQuantity(item);
          toteEdited();
        })
        .catch((error) => {});
    }
  };

  const handleMoveToBag = () => {
    const data = {
      user_id: user.id,
      product_id: productId,
      quantity: 1,
    };
    ToteApi.addToTote(data)
      .then((result) => {
        ProductsApi.removeFromFavorites(productId, user.id)
          .then((result) => {
            toteEdited();
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  const handleMoveToFavorites = () => {
    const data = {
        userId: user.id,
        productId: productId
      };
    ToteApi.removeToteItem(data)
      .then((result) => {
        ProductsApi.saveProducts({productId: productId})
          .then((result) => {
            toteEdited();
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.toteCardItem}>
      <View style={toteContainer}>
        <View>
          <Image
            source={
              image
                ? {
                    uri: image,
                  }
                : NoImage
            }
            style={imageStyle}
          />
        </View>
        <View style={descriptionStyle}>
          <Text style={styles.nameToteItem}>{name}</Text>
          <Text style={styles.priceToteItem}>{'$ ' + (price || '0')}</Text>
          {isFavorite && (
            <View style={styles.favoriteActionContainer}>
              <View style={{borderWidth: 1, padding: 5}}>
                <TouchableOpacity onPress={handleMoveToBag}>
                  <Image source={AddToBag} style={bagImageStyle} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
      <View>
        {!isFavorite && (
          <View style={styles.toteActionContainer}>
            <View style={{borderWidth: 1, padding: 5}}>
              <TouchableOpacity onPress={handleMoveToFavorites}>
                <Image source={AddToFavorite} style={favoriteImageStyle} />
              </TouchableOpacity>
            </View>
            {sizes && sizes.length ? (
              <View>
                <Text>Size</Text>
                <View>
                  <RNPickerSelect
                    value={selectedSize}
                    onValueChange={(value) => changeSize(value)}
                    items={sizes}
                    useNativeAndroidPickerStyle={false}
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
                        paddingRight: 20,
                      },
                      inputAndroid: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        color: 'black',
                        paddingRight: 20,
                      },
                      iconContainer: {
                        top: 10,
                        right: 7,
                      },
                    }}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}
            {colors && colors.length ? (
              <View>
                <Text>Color</Text>
                <View>
                  <RNPickerSelect
                    value={selectedColor}
                    onValueChange={(value) => changeColor(value)}
                    items={colors}
                    useNativeAndroidPickerStyle={false}
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
                        paddingRight: 20,
                      },
                      inputAndroid: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        color: 'black',
                        paddingRight: 20,
                      },
                      iconContainer: {
                        top: 10,
                        right: 7,
                      },
                    }}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}
            <View>
              <Text>Qty</Text>
              <View>
                <RNPickerSelect
                  value={selectedQuantity}
                  onValueChange={(value) => handleEditToteProduct(value)}
                  items={quantities}
                  useNativeAndroidPickerStyle={false}
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
                      paddingRight: 20,
                    },
                    inputAndroid: {
                        fontSize: 16,
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        color: 'black',
                        paddingRight: 20,
                    },
                    iconContainer: {
                      top: 10,
                      right: 7,
                    },
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ToteItem;
