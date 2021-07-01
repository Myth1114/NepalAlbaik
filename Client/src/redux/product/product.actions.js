import productTypes from "./product.types";

export const fetchProductBrandStart = (param) => ({
  type: productTypes.FETCH_PRODUCTS_BRAND_START,
});

export const fetchProductBrandSuccess = (payload) => ({
  type: productTypes.FETCH_PRODUCTS_BRAND_SUCCESS,
  payload: payload,
});

export const fetchProductBrandFailure = () => ({
  type: productTypes.FETCH_PRODUCTS_BRAND_FAILURE,
});
export const fetchBrandProductStart = (param) => ({
  type: productTypes.FETCH_BRAND_PRODUCT_START,
  payload: param,
});
export const setProductLength = (length) => ({
  type: productTypes.SET_PRODUCT_LENGTH,
  payload: length,
});
// export const fetchProductByCategoryStart = (category) => ({
//   type: productTypes.FETCH_PRODUCT_BY_CATEGORY_START,
//   payload: category,
// });
// export const fetchProductByCategorySuccess = (productsByCategory) => ({
//   type: productTypes.FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
//   payload: productsByCategory,
// });
// export const fetchProductByCategoryFailure = (error) => ({
//   type: productTypes.FETCH_PRODUCT_BY_CATEGORY_FAILURE,
//   payload: error,
// });
export const fetchProductCategoryStart = (searchTerm) => ({
  type: productTypes.FETCH_PRODUCT_CATEGORY_START,
});
export const fetchProductCategorySuccess = (categoryList) => ({
  type: productTypes.FETCH_PRODUCT_CATEGORY_SUCCESS,
  payload: categoryList,
});
export const fetchProductCategoryFailure = (error) => ({
  type: productTypes.FETCH_PRODUCT_CATEGORY_FAILURE,
  payload: error,
});
export const fetchBrandProductSuccess = (product) => ({
  type: productTypes.FETCH_BRAND_PRODUCT_SUCCESS,
  payload: product,
});
export const fetchBrandProductFailure = (error) => ({
  type: productTypes.FETCH_BRAND_PRODUCT_FAILURE,
  payload: error,
});
export const brandCleanUp = () => ({
  type: productTypes.BRAND_CLEANUP,
});
export const fetchProductByIdStart = (productInfo) => ({
  type: productTypes.FETCH_PRODUCT_BY_ID_START,
  payload: productInfo,
});
export const fetchProductByIdSuccess = (productInfo) => ({
  type: productTypes.FETCH_PRODUCT_BY_ID_SUCCESS,
  payload: productInfo,
});
export const fetchProductByIdFailure = (error) => ({
  type: productTypes.FETCH_PRODUCT_BY_ID_FAILURE,
  payload: error,
});
export const updateProductByIdStart = (updateProductObj) => ({
  type: productTypes.UPDATE_PRODUCT_BY_ID_START,
  payload: updateProductObj,
});
export const updateProductByIdSuccess = () => ({
  type: productTypes.UPDATE_PRODUCT_BY_ID_SUCCESS,
});
export const updateProductByIdFailure = (error) => ({
  type: productTypes.UPDATE_PRODUCT_BY_ID_FAILURE,
  payload: error,
});
export const fetchProductBySearchStart = (searchInfo) => ({
  type: productTypes.FETCH_PRODUCT_BY_SEARCH_START,
  payload: searchInfo,
});
export const fetchProductBySearchSuccess = (searchList) => ({
  type: productTypes.FETCH_PRODUCT_BY_SEARCH_SUCCESS,
  payload: searchList,
});

export const fetchProductBySearchFailure = (error) => ({
  type: productTypes.FETCH_PRODUCT_BY_SEARCH_FAILURE,
  payload: error,
});
export const setProductOption = (option) => ({
  type: productTypes.SET_PRODUCT_OPTION,
  payload: option,
});
export const setSearchTerm = (searchTerm) => ({
  type: productTypes.SET_SEARCH_TERM,
  payload: searchTerm,
});
export const clearSearchList = () => ({
  type: productTypes.CLEAR_SEARCH_LIST,
});
export const clearProductList = () => ({
  type: productTypes.CLEAR_PRODUCT_LIST,
});
