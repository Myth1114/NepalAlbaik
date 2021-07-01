import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: undefined,
  passwordResetLoading: false,
  passwordReset: false,
  passwordResetError: undefined,
  signUpstartStatus: false,
  signedUp: false,
  
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        signUpstartStatus: true,
        currentUser: null,
        error: undefined,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpstartStatus: false,
        currentUser: null,
        error: undefined,
        signedUp: true,
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: undefined,
        currentUserLoading: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return INITIAL_STATE;
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpstartStatus: false,
        error: action.payload,
      };
    // case UserActionTypes.UPDATE_ADDRESS_START:
    //   return {
    //     ...state,
    //     isAddressLoading: true,
    //   };
    case UserActionTypes.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        address: {
          ...action.payload,
        },
        isAddressLoading: false,
      };
    case UserActionTypes.UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        isAddressLoading: false,
        error: action.payload,
      };
    case UserActionTypes.SEND_PASSWORD_RESET_START:
      return {
        ...state,
        passwordResetLoading: true,
        passwordReset: false,
        passwordResetError: undefined,
      };
    case UserActionTypes.SEND_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordResetLoading: false,
        passwordReset: true,
        passwordResetError: undefined,
      };
    case UserActionTypes.SEND_PASSWORD_RESET_FAILURE:
      return {
        ...state,
        passwordResetLoading: false,
        passwordReset: false,
        passwordResetError: action.payload,
      };
    case UserActionTypes.CLEAN_UP_USER_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default userReducer;
