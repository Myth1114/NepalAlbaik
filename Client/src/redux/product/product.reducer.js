import productTypes from "./product.types";
import userTypes from "./../user/user.types";
// SIGN_OUT_SUCCESS

const initialState = {
  searchListLoading: false,
  searchList: null,
  searchListError: undefined,
  searchTerm: null,
  productBrandList: null,
  productList: null,
  categoryList: null,
  categoryListError: undefined,
  fetchingCategoryList: false,
  isLoading: false,
  isProductListLoading: false,
  error: undefined,
  // isProductLoading: true,
  isProductLoading: false,
  product: null,
  productOption: "none",

  isProductUpdating: false,
  productUpdateError: undefined,
  isProductUpdated: false,
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.FETCH_PRODUCTS_BRAND_START:
      return {
        ...state,
        isLoading: false,
        productBrandList: null,
        error: undefined,
      };
    case productTypes.FETCH_PRODUCTS_BRAND_SUCCESS:
      return {
        ...state,
        productBrandList: action.payload.brands,
        isLoading: false,
        error: undefined,
      };

    case productTypes.FETCH_PRODUCTS_BRAND_FAILURE:
      return {
        products: null,
        error: action.payload,
        isLoading: false,
      };
    case productTypes.FETCH_PRODUCT_CATEGORY_START:
      return {
        ...state,
        fetchingCategoryList: true,
      };
    case productTypes.FETCH_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        fetchingCategoryList: false,
      };
    case productTypes.FETCH_PRODUCT_CATEGORY_FAILURE:
      return {
        ...state,
        categoryListError: action.payload,
        fetchingCategoryList: false,
      };
    case productTypes.FETCH_BRAND_PRODUCT_START:
    case productTypes.FETCH_PRODUCT_BY_CATEGORY_START:
      return {
        ...state,
        isProductListLoading: true,
        productList: null,
        error: undefined,
      };
    case productTypes.FETCH_BRAND_PRODUCT_SUCCESS:
    case productTypes.FETCH_PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        productList: [...action.payload.product],
        isProductListLoading: false,
        error: undefined,
      };
    case productTypes.FETCH_BRAND_PRODUCT_FAILURE:
    case productTypes.FETCH_PRODUCT_BY_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isProductListLoading: false,
        productList: null,
      };
    case productTypes.FETCH_PRODUCT_BY_ID_START:
      return {
        ...state,
        isProductLoading: true,
        product: null,
        error: undefined,
      };
    case productTypes.FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isProductLoading: false,
        product: action.payload,
        error: undefined,
      };
    case productTypes.FETCH_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        isProductLoading: false,
        error: action.payload,
        product: null,
      };
    case productTypes.SET_PRODUCT_OPTION:
      return {
        ...state,
        productOption: action.payload,
      };
    case productTypes.UPDATE_PRODUCT_BY_ID_START:
      return {
        ...state,
        isProductUpdating: true,
        isProductUpdated: false,
        productUpdateError: undefined,
      };
    case productTypes.UPDATE_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isProductUpdating: false,
        isProductUpdated: true,
        productUpdateError: undefined,
      };
    case productTypes.UPDATE_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        isProductUpdating: false,
        isProductUpdated: true,
        productUpdateError: action.payload,
      };
    // SET_PRODUCT_OPTION
    // case userTypes.SIGN_OUT_SUCCESS:
    //   return initialState;BRAND_CLEANUP
    case productTypes.BRAND_CLEANUP:
      return initialState;
    case productTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case productTypes.FETCH_PRODUCT_BY_SEARCH_START:
      return {
        ...state,
        serachListLoading: true,
        searchList: null,
        searchListError: undefined,
      };
    case productTypes.FETCH_PRODUCT_BY_SEARCH_SUCCESS:
      return {
        ...state,
        serachListLoading: false,
        searchList: action.payload,
        searchListError: undefined,
      };
    case productTypes.FETCH_PRODUCT_BY_SEARCH_FAILURE:
      return {
        ...state,
        serachListLoading: false,
        searchList: null,
        searchListError: action.payload,
      };
      case productTypes.CLEAR_SEARCH_LIST:
      return {
        ...state,
        searchListLoading: false,
        searchList: null,
        searchListError: undefined,
      };
    case productTypes.CLEAR_PRODUCT_LIST:
      return {
        ...state,
        productList: null,
      };
      case productTypes.SET_PRODUCT_LENGTH:
        return {
          ...state,
          productLength:action.payload
        }
    case productTypes.BRAND_CATEGORY_CLEANUP:
      return {
        ...state,
        productBrandList: initialState.productBrandList,
        categoryList: initialState.categoryList,
      };
    default:
      return state;
  }
};

export default productReducer;
