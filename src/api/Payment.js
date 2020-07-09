import axios from 'axios';

import Constants from '../appConfig/Constants';

export function getPaymentGateways() {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/payment_gateways?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.get(url).then(response => {
            resolve(getPaymentMethods(response.data))
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

export function doPayment(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v2/stripe_payment?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data).then(response => {
            resolve(response.data)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

const getPaymentMethods = (result) => {
    let paymentGateways = result
    let paymentMethods = []
    paymentGateways.forEach((element) => {
        if(element.enabled) {
            paymentMethods.push(element)
        }
    })
    return paymentMethods;
}