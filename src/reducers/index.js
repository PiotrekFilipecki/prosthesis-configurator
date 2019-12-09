
import { combineReducers } from 'redux';
import app from './app';
import personalize from './personalize';
import details from './details';



const mainReducer = combineReducers({
  app,
  details,
  personalize,
 });

export default mainReducer;
