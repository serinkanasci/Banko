import { CHANGE_USERP} from "../actions/action-types";

export function testMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === CHANGE_USERP) {
        if(action.payload.phonenumber.length===9){
          let test = "0"+action.payload.phonenumber;
          action.payload.phonenumber = test;
          localStorage.setItem('userp',JSON.stringify(action.payload));
        }
      }
      return next(action);
    };
  };
}