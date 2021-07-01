import React, { lazy, Suspense } from "react";

import { Route, Switch } from "react-router-dom";

import PersistentDrawerLeft from "./components/drawer.component";

import SignUp from "./components/signup.component";
import AddressForm from "./components/address.component";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckOutAddressForm from "./components/checkoutAddress";

import Spinner from "./../src/components/spinner.component";
import LoginComponent from "./components/login1.component";

import { selectproductBrandList } from "./redux/product/product.selector";

import CartCards from "./components/cartCards.component";

import OrderDetails from "./components/orderDetails.component";

import ContactUs from "./components/contact.component";
import BottomNavigation from "./components/BottomNavigation";
import AdminOrderScreen from "./components/adminOrderScreen.component";
import AdminOrderDetails from "./components/adminOrderDetails.compoent";
import AdminProducts from "./components/adminProducts.component";
import UpdateProduct from "./components/updateProduct.component";
import ResetEmail from "./components/resetPassword.component";
import OrderStats from "./components/adminOrderStats.component";
import ErrorBoundary from "./components/error-boundary.component";
import ProfileComponent from "./components/profile1.component";

const ProductDetailPage = lazy(() =>
  import("./components/productDetailPage.component")
);
const reviewOrder = lazy(() =>
  import("./../src/components/reviewOder.component")
);
const OrderScreen = lazy(() =>
  import("./components/orderScreenPage.component")
);

const ProductList = lazy(() => import("./components/productList.component"));
const About = lazy(() => import("./components/About"));

const HomePage = lazy(() => import("./components/HomePage.component"));

function App() {
  return (
    <ErrorBoundary>
      <div>
        <PersistentDrawerLeft />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/contactUs" component={ContactUs} />

            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/signupForm" component={SignUp} />
            <Route exact path="/profile" component={ProfileComponent} />
            <Route exact path="/address" component={AddressForm} />
            <Route
              exact
              path="/product/searchTerm/:field/:searchTerm"
              component={ProductList}
            />
            <Route
              exact
              path="/product/searchTerm/:field/:searchTerm/:id"
              component={ProductDetailPage}
            />
            <Route
              path="/:cart/checkOutAddress/reviewOrder"
              component={reviewOrder}
            />
            <Route
              path="/:cart/checkOutAddress"
              component={CheckOutAddressForm}
            />

            <Route
              exact
              path="/orders/orderDetails/:id"
              component={OrderDetails}
            />
            <Route
              exact
              path="/order-info/AdminOrderDetails/:id"
              component={AdminOrderDetails}
            />

            <Route exact path="/orders" component={OrderScreen} />
            <Route
              exact
              path="/order-info/Byfield/:isDeliveredKey/:isDeliveredValue"
              component={AdminOrderScreen}
            />

            <Route path="/cart" component={CartCards} />
            <Route path="/About-us" component={About} />
            <Route path="/order-info" component={AdminOrderScreen} />
            <Route exact path="/DashBoard" component={OrderStats} />

            <Route exact path="/product-info" component={AdminProducts} />
            <Route
              exact
              path="/product-info/updateProduct/:productId"
              component={UpdateProduct}
            />
            <Route exact path="/Login/resetPassword" component={ResetEmail} />
          </Switch>
        </Suspense>

        <BottomNavigation />
      </div>
    </ErrorBoundary>
  );
}
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  brandList: selectproductBrandList,
});
export default connect(mapStateToProps)(App);
