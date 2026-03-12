import { combineReducers } from 'redux';
import app from './app';
import details from './details';
import personalize from './personalize';

const mainReducer = combineReducers({
  app,
  details,
  personalize
});

export default mainReducer;
