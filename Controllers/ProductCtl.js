const Product = require("../Models/Product");
const shortid = require("shortid");
const slugify = require("slugify");
const {uploadToS3} = require("../middleware/Uploads");
// const { uploadS3 } = require("../middleware/index");

exports.createProduct = (req, res) => {
  // res.status(200).json( { file: req.files, body: req.body } );

  const {
    name,
    short_desc,
    long_desc,
    sku,
    additional_info,
    ship_policy,
    price,
    sale_price,
    review,
    ratings,
    until,
    top,
    featured,
    author,
    stock,
    cat,
    sold,
    main_cat,
    colour,
    isAddon,
    newProduct,
    time_slots,
    sub_cat,
    productPictures,
  } = req.body;
  // let  sub_cat = []
  // let  time_slots = []
  // let productPictures = [];
  // if (req.files.length > 0) {
  //   productPictures = req.files.map((file) => {
  //     console.log(file)
  //   });
  // }

  // if(req.body.sub_cat.length > 0){
  //   sub_cat = req.body.sub_cat.map((cat) => {
  //     return { cat_name: cat };
  //   })
  // }

  // if(req.body.time_slots.length > 0){
  //   time_slots = req.body.time_slots.map((time) => {
  //     return {  name: time };
  //   })
  // }

  const product = new Product({
    name,
    slug: slugify(name),
    short_desc,
    long_desc,
    additional_info,
    ship_policy,
    price,
    sku,
    sale_price,
    stock,
    review,
    ratings,
    until,
    top,
    featured,
    author,
    cat,
    sold,
    main_cat,
    time_slots,
    sub_cat,
    colour,
    newProduct,
    isAddon,
    productPictures,
    // createdBy: req.user._id,
  });
  console.log(productPictures);
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.getProducts = async (req, res) => {
  try {
    const isAddon = req.query.isAddon;
    let boolOutput = isAddon === "true";
    const get = await Product.find();
    const minprice = req.query.minprice || "";
    const maxprice = req.query.maxprice || "";
    const color = req.query.color || "";
    const filter = get.filter((item) => item.isAddon === boolOutput);
    // console.log(filter.length);
    // console.log(isAddon,filter.length);
    if (get.length === 0) {
      res.status(400).json({ error: "No Products Found" });
    } else {
      const colorfilter = filter.filter((item) => item.color === color);
      const priceFilter = filter.filter(
        (item) => item.sale_price <= maxprice && item.sale_price >= minprice
      );
      const filter2 = colorfilter.filter(
        (item) => item.sale_price <= maxprice && item.sale_price >= minprice
      );
      if (!color == "" && !minprice == "") {
        res.status(200).json({ filter: filter2 });
      } else if (!color == "") {
        res.status(200).json({ filter: colorfilter });
      } else if (!minprice == "") {
        res.status(200).json({ filter: priceFilter });
      } else {
        res.status(200).json({ filter: filter });
      }
    }
  } catch {
    (err) => res.json(err);
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const get = await Product.find();
    const search = req.query.name || "";
    const cat = req.query.cat || "";
    const sub_cat = req.query.sub_cat || "";
    const minprice = req.query.minprice || "";
    const maxprice = req.query.maxprice || "";
    const color = req.query.color || "";
    if (search) {
      Product.find({ name: { $regex: search, $options: "$i" } }).then(
        (data) => {
          if (data === 0) {
            res.status(400).json({ error: "No Products Found" });
          } else {
            const filter = data.filter((item) => item.colour === color);
            const priceFilter = data.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            const filter2 = filter.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            if (!color == "" && !minprice == "") {
              res.status(200).json({ data: filter2 });
            } else if (!color == "") {
              res.status(200).json({ data: filter });
            } else if (!minprice == "") {
              res.status(200).json({ data: priceFilter });
            } else {
              res.status(200).json({ data });
            }
          }
        }
      );
    } else if (cat) {
      Product.find({ main_cat: { $regex: cat, $options: "$i" } }).then(
        (catData) => {
          if (catData === 0) {
            res.status(400).json({ error: "No Products Found" });
          } else {
            const filter = catData.filter((item) => item.colour === color);
            const priceFilter = catData.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            const filter2 = filter.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            if (!color == "" && !minprice == "") {
              res.status(200).json({ catData: filter2 });
            } else if (!color == "") {
              res.status(200).json({ catData: filter });
            } else if (!minprice == "") {
              res.status(200).json({ catData: priceFilter });
            } else {
              res.status(200).json({ catData });
            }
          }
        }
      );
    } else if (sub_cat) {
      Product.find({ sub_cat: { $regex: sub_cat, $options: "$i" } }).then(
        (catData) => {
          if (catData === 0) {
            res.status(400).json({ error: "No Products Found" });
          } else {
            const filter = catData.filter((item) => item.colour === color);
            const priceFilter = catData.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            const filter2 = filter.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            if (!color == "" && !minprice == "") {
              res.status(200).json({ catData: filter2 });
            } else if (!color == "") {
              res.status(200).json({ catData: filter });
            } else if (!minprice == "") {
              res.status(200).json({ catData: priceFilter });
            } else {
              res.status(200).json({ catData });
            }
          }
        }
      );
    } else {
      if (get.length === 0) {
        res.status(400).json({ error: "No Products Found" });
      } else {
        res.status(200).json({ get });
      }
    }
  } catch {
    (err) => res.json(err);
  }
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const user = await Product.find({ slug: req.params.slug });
    res.json(user);
  } catch (err) {
    res.json({ err });
  }
};

exports.deleteProductById = (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ err });
    } else {
      res.json(data);
    }
  });
};

exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true },
    (err, data) => {
      try {
        res.json(data);
      } catch (err) {
        res.json({ err });
      }
    }
  );
};

exports.fileData = async (req, res) => {
  try {
    let productPictures = [];
    if (req.files && Array.isArray(req.files)) {
      // Handle an array of files
      for (const file of req.files) {
        const fileData = file.buffer; // Get file data from multer
        // Determine the file type based on its MIME type
        let fileType = '';
        if (file.mimetype === 'application/pdf') {
          fileType = 'pdf';
        } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
          fileType = 'jpg';
        } else if (file.mimetype === 'image/png') {
          fileType = 'png';
        }  else if (file.mimetype === 'video/mp4') {
          fileType = 'video/mp4';
        } else {
          return res.json({ error: 'Unsupported file type' });
        }
        // Call the uploadToS3 function to upload the file to S3
        const uploadResults = await uploadToS3( [{fileData}], fileType );
        // Extract Location from each upload result and push it to the files array
        for (const result of uploadResults) {
          productPictures.push(result.Location);
        }
      }
    }
console.log()
    // Update the database with the array
    await Product.findOneAndUpdate({ _id: req.params.id }, { productPictures });
    // res.json({
    //   message: 'files updated successfully',
    //   productPictures: {productPictures },
    // })
    res.status(200).json({
      message: 'files updated successfully',
        productPictures: productPictures ,
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



