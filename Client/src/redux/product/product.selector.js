import { createSelector } from "reselect";
// create an input selector to retrieve the user state
export const selectProduct = (state) => state.product;
export const selectproductBrandList = createSelector(
  selectProduct,
  (product) => product.productBrandList
);

export const selectProductList = createSelector(
  selectProduct,
  (product) => product.productList
);
export const selectProductById = createSelector(
  selectProduct,
  (product) => product.product
);
export const selectProductByIdLoading = createSelector(
  selectProduct,
  (product) => product.isProductLoading
);
export const selectProductIsLoading = createSelector(
  selectProduct,
  (product) => product.isLoading
);
export const selectProductOption = createSelector(
  selectProduct,
  (product) => product.productOption
);
