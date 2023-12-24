import createReducer from '../library/createReducer';
import * as types from '../actions/types';
import { initialState, isAppTour } from './initialState';

export const userReducer = createReducer(initialState, {
  [types.update_redux](state, action){
    return {
      ...state,
      ...action.payload ? action.payload : {}
    }
  },

});

// export const appTourReducer = createReducer(isAppTour, {
//   [types.is_app_tour](state, action){
//     return {
//       ...state,
//       ...action.payload ? action.payload : false
//     }
//   },
// });