import { combineReducers } from 'redux';
import bk from './bk.reducer';
import ui from './ui.reducer';

const createReducer = (asyncReducers) =>
    combineReducers({
        bk,
        ui
    });

export default createReducer;
