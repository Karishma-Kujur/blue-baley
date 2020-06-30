import axios from 'axios';

export function submitAnswers(data) {
    return new Promise((resolve, reject) => {
        const url = `https://www.departmynt.co/wp-json/user_survey/result`
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
    });
}