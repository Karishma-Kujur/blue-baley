import { combineReducers } from 'redux';
import products from './ProductReducer';
import tote from './ToteReducer';
import survey from './SurveyReducer';
import user from './UserReducer';

const RootReducer = combineReducers({
	products,
	tote,
	survey,
	user
});

export default RootReducer;