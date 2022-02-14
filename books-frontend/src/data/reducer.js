import { combineReducers } from "redux";

import * as Payload from "../assets/constant";

const userInisialState = {
  login: false,
  email: null,
};

const book = (state = [], action) => {
  switch (action.type) {
    case Payload.ALL_BOOK:
      return [...action.payload];
    case Payload.FETCH_BOOK:
        return [...action.payload];
    case Payload.CREATE_BOOK:
      return [...state, action.payload];
    case Payload.EDIT_BOOK:
      state = state.map((item)=>{
          if(item._id === action.payload.id){
              return {...item,...action.payload.data};
          }
          return item;
      })
      return [...state];
    case Payload.DELETE_BOOK:
      return state.filter((item) => {
        return item._id !== action.payload.id;
      });
    default:
      return state;
  }
};

const user = (state = userInisialState, action) => {
  switch (action.type) {
    case Payload.FETCH_USER:
      state.login = true;
      state.email = action.payload.email;
      return state;
    case Payload.LOGIN_USER:
      state.login = true;
      state.email = action.payload.email;
      return state;
    case Payload.SINGUP_USER:
      state.login = true;
      state.email = action.payload.email;
      return state;
    case Payload.LOGOUT_USER:
      state.login = false;
      state.email = null;
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  user: user,
  book: book,
});
