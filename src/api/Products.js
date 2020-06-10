import axios from 'axios';

import Constants from '../appConfig/Constants';
import *  as types from '../constants/ActionTypes';

export function getProducts() {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/products?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getProjectsFromResult(response.data))
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
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