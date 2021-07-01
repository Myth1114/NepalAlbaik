const express = require("express");
const ProductsController = require("./../controllers/ProductsController");
const AuthController = require(`${__dirname}/../controllers/authController`);
const ordersController = require(`./../controllers/ordersController.js`);

const ProductsRouter = express.Router();
// ProductsRouter.route(["/allProducts"]).get(ProductsController.getAllProducts);
ProductsRouter.route("/getAllCategories").get(
  ProductsController.getAllCategories
);
ProductsRouter.route("/brands").get(ProductsController.getAllBrands);
ProductsRouter.route("/brands/:key/:value").get(
  ProductsController.getByBrandName
);

ProductsRouter.route("/category/:category").get(
  ProductsController.getByCategory
);
ProductsRouter.route("/orders")
  .get(AuthController.protect, ordersController.getOrders)
  .post(AuthController.protect, ordersController.createOrders);
ProductsRouter.route("/createProduct").post(ProductsController.createProduct);
ProductsRouter.route("/getAllOrders").get(
  AuthController.protect,
  ordersController.getAllOrders
);
ProductsRouter.route("/getOrderStats").get(ordersController.getOrderStats);
ProductsRouter.route("/orders/getMyOrders").get(
  AuthController.protect,
  ordersController.getMyOrders
);
ProductsRouter.route(
  "/orders/getMyOrders/:isDeliveredKey/:isDeliveredValue"
).get(AuthController.protect, ordersController.getMyOrders);
//ProductsRouter.route([category]).get(ProductsController.getByCategory);
ProductsRouter.route("/:id").get(ProductsController.getByID);

ProductsRouter.route("/updateProductById/:productId").patch(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  ProductsController.updateProduct
);
ProductsRouter.route("/orders/:id")
  .get(AuthController.protect, ordersController.getOrderById)
  .patch(AuthController.protect, ordersController.updateOrderStatus);
module.exports = ProductsRouter;
