const products = require("./../models/productsModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apifeatures");

exports.getByCategory = catchAsync(async (req, res) => {
  const product = await products.find({ category: req.params.category });

  res.status(200).json({ data: { product } });
});
exports.getByID = catchAsync(async (req, res, next) => {
  const product = await products.findById(req.params.id);

  res.status(200).json({ status: "success", data: product });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await products.create(req.body);
  if (!product) {
    return next(new AppError("something went wrong creating products", 500));
  }
  res.status(200).json({ mesage: "success", data: product });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("You do not have permission to perform this action", 401)
    );
  }

  req.body.options =
    req.body.options === null || req.body.options === undefined
      ? { key: [""] }
      : req.body.options;
  const { options } = req.body;

  const key = Object.keys(options)[0];
  const value = Object.values(options)[0];
  const valueArray = value.filter((el, index) => el === false);

  if (
    key.length === 0 ||
    options === null ||
    options === undefined ||
    value.some((el, index) => el.length === 0)
  ) {
    const updatedProduct = await products.findByIdAndUpdate(
      req.params.productId,
      { ...req.body, options: null }
    );
    if (!updatedProduct) {
      return next(
        new AppError(`no such product with ${req.params.id} found `, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedProduct,
      },
    });
  } else {
    const updatedProduct = await products.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      return next(
        new AppError(`no such product with ${req.params.id} found `, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedProduct,
      },
    });
  }
});

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await products.aggregate([
    { $match: { subCategory: { $exists: true } } },
    {
      $project: {
        _id: 1,
        name: "$name",
        subCategory: "$subCategory",
        price: "$price",
      },
    },
    {
      $group: {
        _id: "$subCategory",
        totalItems: { $sum: "$price" },
      },
    },
  ]);
  const brandsArray = brands.map((el, index) => el._id);

  res.status(200).json({ status: "success", data: { brands: brandsArray } });
});

exports.getByBrandName = catchAsync(async (req, res, next) => {
  let { key, value } = req.params;
  console.log();

  value = value.replace(/[&\/\\#,^+()$~%.'":*?<>|{}]/g, false);
  if (value.toLowerCase() === "false" || value === false) {
    res.status(200).json({
      status: "success",
      data: {
        product: [],
      },
    });
  } else {
    req.query = { ...req.query, sort: "name,price" };
    const query =
      key === "tags"
        ? products.find({ [key]: { $regex: value } })
        : products.find({ [key]: value });
    const length = await products.countDocuments({ [key]: value });
    const tag= key==='tags'?true:false;
    const features = new APIFeatures(query, req.query).paginate(tag).sort();
    const product = await features.query;

    if (!product) {
      return next(new AppError("no data found ", 404));
    }
    // if (product.length === 0) {
    //   return next(new AppError(" no product found for your Search", 404));
    // }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
      length,
    });
  }
});
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await products.aggregate([
    { $match: { category: { $exists: true } } },

    {
      $group: {
        _id: "$category",
      },
    },
  ]);

  const categoryList = categories.map((el) => el._id);
  res.status(200).json({
    status: "success",
    data: {
      categoryList,
    },
  });
});
