import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import FavoritesItem from './ToteItem'
import Avatar from '../assets/images/avatar.jpeg'
import * as ProductAction from '../actions/ProductAction';
import * as ProductApi from '../api/Products'
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const FavoritesScreen = (props) => {
  const { navigation, ProductAction, products } = props
  const [spinner, setLoader] = useState('')
  const imageStyle = [
    {
      alignItems: 'flex-start',
      width: 30,
      height: 30,
    }
  ];

  const getProducts = () => {
    setLoader(true)
    ProductApi.getProducts()
      .then((result) => {
        setLoader(false)
        ProductAction.setProducts(result)

      })
      .catch((error) => {
        setLoader(false)
        Alert.alert('Invalid User name or Password', 'Please enter valid user name and password')
      })
  }

  const isFocused = useIsFocused()
  useEffect(() => {
    getProducts()
  }, [isFocused])
  return (
    <View style={styles.containerMatches}>
      <Spinner
        visible={spinner}
      />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
          <Image source={Avatar} style={imageStyle} />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
      </View>
      <ScrollView>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <FavoritesItem
                image={item.images && item.images[0]}
                name={item.name}
                price={item.price}
                productId={item.id}
                isFavorite={true}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <View style={styles.bottom}>
        <Button label="View Tote" onPress={() => navigation.navigate('View Tote')} />
      </View>
    </View>
  )
}
const mapStateToProps = ({ products }) => {
  return {
    products: products
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ProductAction: bindActionCreators(ProductAction, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)

