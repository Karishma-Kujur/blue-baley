import { combineReducers } from 'redux';
import products from './ProductReducer';
import tote from './ToteReducer';
import survey from './SurveyReducer';

const RootReducer = combineReducers({
	products,
	tote,
	survey
});

export default RootReducer;