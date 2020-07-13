import axios from 'axios';

import Constants from '../appConfig/Constants';
import *  as types from '../constants/ActionTypes';

export function getSurveyQuestions() {
    return (dispatch) => {
        const url = `${Constants.URL.wc}/quiz-survey-master/v1/questions?quizID=2?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        return axios.get(url).then(response => {
            dispatch({
                type: types.GET_SURVEY_QUESTION_SUCCESS,
                surveyQuestions: getSurveyQuestionsFromResult(response.data)
            }
            )
        }).catch(err => {
            console.log(err.error);
        })
    };
}

const getSurveyQuestionsFromResult = (result) => {
    const surveyList = result
    const surveyQuestions = []
    surveyList.forEach((product) => {
        surveyQuestions.push({
            id: product.id,
            question: product.name,
            required: product.required === "1" ? true : false,
            multiselect: (product.type === "0" || product.type === "1") ? false : true,
            answerType: product.answerEditor === 'rich' ? 'image' : 'text',
            answers: getAnswer(product.answers),
        })
    })
    return surveyQuestions;
}

const getAnswer = (list) => {
    const answers = []
    list.forEach((answer, index) => {
        answers.push({
            id: index,
            answer: answer[0],
            keyAttribute: answer[1]
        })
    })
    return answers
}