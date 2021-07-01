import UserActionTypes from "./user.types";

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = () => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
export const updateAddressStart = (address) => ({
  type: UserActionTypes.UPDATE_ADDRESS_START,
  payload: address,
});
export const updateAddressSuccess = (address) => ({
  type: UserActionTypes.UPDATE_ADDRESS_SUCCESS,
  payload: address,
});
export const updateAddressFailure = (error) => ({
  type: UserActionTypes.UPDATE_ADDRESS_FAILURE,
  payload: error,
});
export const sendPasswordResetStart = (email) => ({
  type: UserActionTypes.SEND_PASSWORD_RESET_START,
  payload: email,
});
export const sendPasswordResetSuccess = () => ({
  type: UserActionTypes.SEND_PASSWORD_RESET_SUCCESS,
});
export const sendPasswordResetFailure = (error) => ({
  type: UserActionTypes.SEND_PASSWORD_RESET_FAILURE,
  payload: error,
});
export const cleanUpUserState = () => ({
  type: UserActionTypes.CLEAN_UP_USER_STATE,
});
