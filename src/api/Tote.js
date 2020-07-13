import axios from 'axios';

import Constants from '../appConfig/Constants';

export function getTotes() {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/cocart/v1/get-cart?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getToteItemsFromResult(response.data))
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function addToTote(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/cocart/v1/add-item?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data, { headers: { 'content-type': 'application/json' } })
            // return axios.get(url)
            .then(response => {
                console.log(response.data)
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function editTote(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/cocart/v1/item?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data, { headers: { 'content-type': 'application/json' } })
            // return axios.get(url)
            .then(response => {
                console.log(response.data)
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

export function clearTote() {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/cocart/v1/clear?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, { headers: { 'content-type': 'application/json' } })
            // return axios.get(url)
            .then(response => {
                console.log(response.data)
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}

const getToteItemsFromResult = (result) => {
    const toteItems = Object.values(result);
    const totes = []
    toteItems.forEach((product) => {
        totes.push({
            id: product.key,
            productId: product.product_id,
            name: product.product_name,
            description: product.description,
            price: product.product_price,
            quantity: product.quantity.toString(),
            image: product.product_image
        })
    })
    return totes;
}