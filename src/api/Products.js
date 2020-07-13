import axios from 'axios';

import Constants from '../appConfig/Constants';

export function getCategory() {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user_survey/getCategoryResults?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function getProducts(categories) {
    return new Promise((resolve, reject) => {
        let url = ''
        if (categories)
            url = `${Constants.URL.wc}/wc/v3/products?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}&category=${categories}`
        else
            url = `${Constants.URL.wc}/wc/v3/products?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getProjectsFromResult(response.data))
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function saveProducts(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/favorite?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function removeFromFavorites(productId, userId) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/delete_favorite?user_id=${userId}&product_id=${productId}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.delete(url).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function getFavorites(userId) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/user/get_favorite?user_id=${userId}`
        axios.get(url).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function placeOder(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/orders?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function getOrderHistory() {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/orders?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getOrderHistoryFromResult(response.data))
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
            attributes: getProductAttributes(product.attributes),
            images: getProductImages(product.images)
        })
    })
    return products;
}

const getProductAttributes = (attributes) => {
    const data = []
    attributes.forEach((element) => {
        data.push({
            id: element.id,
            name: element.name,
            options: getOptions(element.options)
        })
    })
    return data
}

const getOptions = (options) => {
    let data = []
    options.forEach((option) => {
        data.push({
            value: option,
            label: option
        })
    })
    return data
}

const getProductImages = (images) => {
    const productImages = []
    images.forEach((image) => {
        productImages.push(image.src)
    })
    return productImages
}

const getOrderHistoryFromResult = (result) => {
    const orderDetails = result
    const orderHistory = []
    orderDetails.forEach((element) => {
        orderHistory.push({
            id: element.id,
            status: element.status,
            total: element.total,
            paymentMethod: element.payment_method,
            currency: element.currency,
            currencySymbol: element.currency_symbol,
            list: element.line_items
        })
    })
    return orderHistory;
}
