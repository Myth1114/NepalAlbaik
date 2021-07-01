import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";
import axios from "axios";
import Cookies from "universal-cookie";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  updateAddressSuccess,
  updateAddressFailure,
  sendPasswordResetSuccess,
  sendPasswordResetFailure,
  signUpSuccess,
} from "./user.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.util";
const cookies = new Cookies();
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* loginApiCall(IdToken) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": cookies.get("XSRF-TOKEN"),
    },
    withCredentials: true,
  };

  const { data } = yield axios.post(
    `/api/v1/users/googleLoginFirebase`,

    JSON.stringify({ IdToken }),
    axiosConfig
  );
  
  return data;
}
export function* signInWithGoogle() {
  try {

    const { user } = yield auth.signInWithPopup(googleProvider);
    const IdToken = yield user.getIdToken();

    
    const data = yield loginApiCall(IdToken);

    const { address, ...dataUser } = data;
    
    yield put(signInSuccess({ ...dataUser }));
    yield put(updateAddressSuccess(address));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {

    yield auth.signInWithEmailAndPassword(email, password);
    const user2 = yield getCurrentUser();
    
    if (user2.emailVerified) {

      const IdToken = yield user2.getIdToken();
      const data = yield loginApiCall(IdToken);
      const { address, ...dataUser } = data;
      yield put(signInSuccess({ ...dataUser }));
      yield put(updateAddressSuccess(address));


    } else {
      user2.sendEmailVerification();
      yield put(
        signInFailure({ message: "Account not verified..please check inbox" })
      );
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        
      },
      withCredentials: true,
    };
    const { data } = yield axios.get(
      `/api/v1/users/signOut`,

      axiosConfig
    );

    yield put(signOutSuccess());
    yield auth.signOut();
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, name } }) {
  try {

    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    
    yield user.sendEmailVerification();
    yield put(signUpSuccess());

  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}
export function* updateAddress({ payload }) {
  // take the dispatched addr obj and make patch api call
  
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      
      },
    };
    const { data } = yield axios.patch(
      `http://127.0.0.1:3001/api/v1/users/updateAddress`,
      payload,
      axiosConfig
    );

    yield put(updateAddressSuccess(data));
  } catch (error) {
    yield put(updateAddressFailure(error));
  }
}

export function* passwordReset({ payload }) {
  try {
    const { email } = payload;
    yield auth.sendPasswordResetEmail(email);
    yield put(sendPasswordResetSuccess());
  } catch (error) {
    yield put(sendPasswordResetFailure(error));
  }
}
export function* onUpdateAddressStart() {
  yield takeLatest(UserActionTypes.UPDATE_ADDRESS_START, updateAddress);
}
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onPasswordResetSaga() {
  yield takeLatest(UserActionTypes.SEND_PASSWORD_RESET_START, passwordReset);
}
export function* userSagas() {
  yield all([
    call(onUpdateAddressStart),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),

    call(onPasswordResetSaga),
  ]);
}
