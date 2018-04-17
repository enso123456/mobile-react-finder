import { FETCH_MOBILE_INFO, CLEAR_MOBILE_INFO } from "../actions/types";

export default function(
  state = {
    result: {}
  },
  action
) {
  switch (action.type) {
    case CLEAR_MOBILE_INFO:
      return {
        ...state,
        result: {}
      };
    case FETCH_MOBILE_INFO:
      return {
        ...state,
        result: action.payload
      };
  }

  return state;
}
