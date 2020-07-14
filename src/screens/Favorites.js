import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import FavoritesItem from './ToteItem'
import Avatar from '../assets/images/avatar.jpeg'
import * as ProductAction from '../actions/ProductAction';
import * as ProductApi from '../api/Products'
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

const FavoritesScreen = (props) => {
  const { navigation, ProductAction, products, user, favorites } = props
  const [spinner, setLoader] = useState('')
  const imageStyle = [
    {
      alignItems: 'flex-start',
      width: 30,
      height: 30,
      borderRadius: 15
    }
  ];

  const getFavoritesByProductId = (productIds) => {
    const favoriteItems = [];
    productIds.forEach((productId) => {
      let item = products.find((product) => product.id === Number(productId))
      if (item)
        favoriteItems.push(item)
    })
    return favoriteItems;
  }

  const getFavorites = () => {
    setLoader(true)
    ProductAction.setFavorites([])
    ProductApi.getFavorites(user.id)
      .then((productIds) => {
        let favoriteItems = getFavoritesByProductId(productIds)
        setLoader(false)
        ProductAction.setFavorites(favoriteItems)
      })
      .catch((error) => {
        setLoader(false)
      })
  }

  const handleRefreshFavorites = () => {
    getFavorites();
  }

  const isFocused = useIsFocused()
  useEffect(() => {
    getFavorites()
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
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <FavoritesItem
                image={item.images && item.images[0]}
                name={item.name}
                price={item.price}
                productId={item.id}
                isFavorite={true}
                toteEdited={handleRefreshFavorites}
                user={user}
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
const mapStateToProps = ({ products, user }) => {
  return {
    favorites: products.favorites,
    products: products.list,
    user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ProductAction: bindActionCreators(ProductAction, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)

