import {
  takeLatest,
  call,
  put,
  all,
  take,
  takeEvery,
} from "redux-saga/effects";
import productTypes from "./product.types";
import axios from "axios";
import {
  fetchProductBrandSuccess,
  fetchProductBrandFailure,
  fetchBrandProductSuccess,
  fetchBrandProductFailure,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  fetchProductCategorySuccess,
  fetchProductCategoryFailure,
  updateProductByIdSuccess,
  updateProductByIdFailure,
  fetchProductBySearchSuccess,
  fetchProductBySearchFailure,
  setProductLength,
} from "./product.actions";

export function* fetchProducts() {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
      },
    };

    const { data } = yield axios.get(
      `/api/v1/products/brands`,

      axiosConfig
    );
    const brandList = data.data;

    yield put(fetchProductBrandSuccess(brandList));
  } catch (error) {
    yield put(fetchProductBrandFailure(error));
  }
}
export function* fetchBrandProduct({ payload }) {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = yield axios.get(
      `/api/v1/products/brands/${Object.keys(payload)[0]}/${
        Object.values(payload)[0]
      }?page=${payload.page}`,

      axiosConfig
    );
    const brandProducts = data.data;

    yield put(fetchBrandProductSuccess(brandProducts));
    yield put(setProductLength(data.length));
  } catch (error) {
    yield put(fetchBrandProductFailure(error));
  }
}
export function* fetchProductsCategory() {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = yield axios.get(
      `/api/v1/products/getAllCategories`,

      axiosConfig
    );

    // fetchProductCategorySuccess
    const {
      data: { categoryList },
    } = data;

    yield put(fetchProductCategorySuccess(categoryList));
  } catch (error) {
    yield put(fetchProductCategoryFailure(error));
  }
}

export function* fetchProductBySearch({ payload }) {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = yield axios.get(
      `/api/v1/products/brands/${Object.keys(payload)[0]}/${
        Object.values(payload)[0]
      }`,

      axiosConfig
    );
    const brandProducts = data.data;

    yield put(fetchProductBySearchSuccess(brandProducts.product));
  } catch (error) {
    yield put(fetchProductBySearchFailure(error));
  }
}
export function* fetchProductById({ payload }) {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = yield axios.get(
      `/api/v1/products/${payload}`,

      axiosConfig
    );
    const productData = data.data;

    yield put(fetchProductByIdSuccess(productData));
  } catch (error) {
    yield put(fetchProductByIdFailure(error));
  }
}
export function* fetchProductSaga() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_BRAND_START, fetchProducts);
}
export function* fetchProductsCategorySaga() {
  yield takeLatest(
    productTypes.FETCH_PRODUCT_CATEGORY_START,
    fetchProductsCategory
  );
}
export function* updateProductById({ payload }) {
  try {
    const { _id, ...updateObj } = payload;

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = yield axios.patch(
      `/api/v1/products/updateProductById/${_id}`, // todo change the api end point
      updateObj,
      axiosConfig
    );
    yield put(updateProductByIdSuccess());
  } catch (error) {
    yield put(updateProductByIdFailure(error));
  }
}

export function* fetchProductBySearchSaga() {
  yield takeLatest(
    productTypes.FETCH_PRODUCT_BY_SEARCH_START,
    fetchProductBySearch
  );
}
export function* updateProductByIdSaga() {
  yield takeLatest(productTypes.UPDATE_PRODUCT_BY_ID_START, updateProductById);
}
export function* fetchBrandProductSaga() {
  yield takeEvery(productTypes.FETCH_BRAND_PRODUCT_START, fetchBrandProduct);
}
export function* fetchProductByIdSaga() {
  yield takeLatest(productTypes.FETCH_PRODUCT_BY_ID_START, fetchProductById);
}
export function* productSagas() {
  yield all([
    call(fetchProductBySearchSaga),
    call(updateProductByIdSaga),
    call(fetchProductSaga),
    call(fetchBrandProductSaga),
    call(fetchProductByIdSaga),
    call(fetchProductsCategorySaga),
    call(fetchProductByIdSaga),
  ]);
}
