import axios from 'axios';

import Constants from '../appConfig/Constants';
import *  as types from '../constants/ActionTypes';

export function loginUser(data) {
    return new Promise((resolve, reject) => {
        const url = `${Constants.URL.wc}/jwt-auth/v1/token?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        axios.post(url, data, { headers: { 'content-type': 'application/json' } })
            .then(response => {
                resolve(response)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}