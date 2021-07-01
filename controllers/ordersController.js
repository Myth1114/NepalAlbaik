const orders = require("./../models/ordersModel");
const Users = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const products = require("./../models/productsModel");
const emailjs = require("emailjs-com");
const APIFeatures = require("./../utils/apifeatures");
const moment = require("moment");
const today = moment().startOf("day");
exports.createOrders = catchAsync(async (req, res, next) => {
  const { orderItems, orderAddress } = req.body;
  if (orderItems.length < 1) {
    return next(new AppError("not allowed", 400));
  }
  req.body.UserId = req.user._id;

  const idArray = orderItems.map((el) => el._id);

  const ProductArray1 = idArray.map(async (el, index) => {
    let productArrayAsync = await products.findById(el);
    return productArrayAsync;
  });

  const ProductArray = await Promise.all(ProductArray1);

  const priceArray = ProductArray.map(
    (el) => el.price - el.price * (el.discount / 100)
  );

  let originalPrice = orderItems.reduce((acc, el, index, array) => {
    acc = acc + el.quantity * priceArray[index];

    return acc;
  }, 0);

  const createdOrder = await orders.create({
    orderItems,
    totalPrice: originalPrice,
    orderAddress,
    userID: req.user._id,
    originalPrice,
    orderTime: Date.now(),
  });

  res
    .status(200)
    .json({ status: "success", order: createdOrder, message: "order created" });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  function compare_item(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  const order = await orders
    .findById(req.params.id)

    .lean()
    .populate({
      path: "orderItems._id",
    })
    .populate({
      path: "userID",
      select: "name email",
    });

  const { orderItems } = order;

  const spreadOrderItems = orderItems.map((el, index) => {
    return { ...el._id, quantity: el.quantity, option: el.option };
  });
  if (!order) {
    return new AppError("order not found", 404);
  }

  if (
    req.user.role === "user" &&
    String(req.user._id) !== String(order.userID._id)
  ) {
    return next(new AppError("Not allowed", 401));
  }

  res.status(200).json({
    status: "success",
    orderDetail: { ...order, orderItems: spreadOrderItems.sort(compare_item) },
  });
});
exports.getOrders = catchAsync(async (req, res, next) => {
  const order = await orders.findById(req.params.id).populate({
    path: "userID",
  });
  res.json(orders);
});

exports.getMyOrders = catchAsync(async (req, res) => {
  const daysBefore = req.user.role === "admin" ? 30 : 60;
  req.query = {
    sort: "-orderTime",
    orderTime: {
      gte: new Date(Date.now() - daysBefore * 864e5),
      lte: new Date(Date.now()),
    },
  };

  if (req.user === null) {
    return next(new AppError("user not signed in", 400));
  }
  const filter =
    req.user.role === "admin"
      ? { isDelivered: "Pending Confirmation" }
      : { userID: req.user._id };

  const filtered =
    req.params === null ||
    req.params === undefined ||
    Object.keys(req.params).length === 0
      ? filter
      : {
          ...filter,
          [Object.values(req.params)[0]]: Object.values(req.params)[1],
        };

  const query = orders.find(filtered).populate({
    path: "userID",
  });

  const features = new APIFeatures(query, req.query).filter().sort();
  const order = await features.query;

  res.status(200).json({ status: "success", orders: order });
});
exports.getOrderStats = catchAsync(async (req, res, next) => {
  const orderStats = await orders.aggregate([
    { $match: { _id: { $exists: true } } },

    {
      $group: {
        _id: "$isDelivered",
        totalOrderNum: { $sum: 1 },
        totalOrderSum: { $sum: "$originalPrice" },
      },
    },
  ]);

  res.status(200).json({ status: "success", stats: orderStats });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const AllOrders = await orders
    .find({
      createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    })
    .populate({
      path: "OrderItems",
      select:
        "-_id -numReviews -countInStock -rating -price -description -image",
    })
    .populate({
      path: "UserId",
      select: "name +email",
    });

  res.status(200).json({
    status: "success",
    AllOrders,
  });
});
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("you do not have Admin Rights for this operation", 401)
    );
  }

  const docs = await orders.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
  });
});
