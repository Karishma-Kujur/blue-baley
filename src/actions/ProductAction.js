import axios from 'axios';

import Constants from '../appConfig/Constants';
import *  as types from '../constants/ActionTypes';

export function setProducts(result) {
    return (dispatch) => {
        dispatch({
            type: types.GET_PRODUCTS_SUCCESS,
            products: result
        }
        )
    };
}

const getProjectsFromResult = (result) => {
    const productsList = result
    const products = []
    productsList.forEach((product) => {
        products.push({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            images: getProductImages(product.images)
        })
    })
    return products;
}

const getProductImages = (images) => {
    const productImages = []
    images.forEach((image) => {
        productImages.push(image.src)
    })
    return productImages
}