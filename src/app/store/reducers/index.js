import { combineReducers } from 'redux';
import bk from './bk.reducer';

const createReducer = (asyncReducers) =>
    combineReducers({
        bk
    });

export default createReducer;
