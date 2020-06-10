import * as types from '../constants/ActionTypes';
import InitialState from './InitialState';

export default function (state = InitialState.survey, action) {
	switch (action.type) {
		case types.GET_SURVEY_QUESTION_SUCCESS:
			return action.surveyQuestions;
		default:
			return state;
	}
}