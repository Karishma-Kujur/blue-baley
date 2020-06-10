import axios from 'axios';

import Constants from '../appConfig/Constants';
import *  as types from '../constants/ActionTypes';

export function signupUser(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/wc/v3/customers?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
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