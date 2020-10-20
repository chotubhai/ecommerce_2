const express = require("express");
const mongoose = require("mongoose");
const app = express();
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const checksum_lib = require("./checksum.js");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");

  next();
};

app.use(express.static("./public"));
app.use(express.static(path.resolve(__dirname,"client","build")));
app.use(allowCrossDomain);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//PAYTM CONFIGURATION
var PaytmConfig = {
  mid: "vfaMpB04463794101408",
  key: "056#dkv9LUW2vqJ&",
  website: "WEBSTAGING",
};

var txn_url = "https://securegw-stage.paytm.in/order/process"; // for staging

var callbackURL = "http://localhost:5000/paymentReceipt";

const {
  miscModel,
  orderModel,
  productModel,
  userModel,
} = require("./model/model");

mongoose.connect(
  "mongodb+srv://root:root@cluster0-zcmfs.mongodb.net/ecommerce?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("mongoose connected");
  }
);

//dev api
app.get("/addtodatabase", () => {
  productModel
    .find()
    .skip(1030)
    .limit(12)
    .then(async (product) => {
      var productTemp;
      let tempArr1 = [];
      let tempArr2 = [];

      for (let i = 0; i < 8; i++) {
        var categorytemp = product[i].categoriesTree
          .slice(2, -2)
          .split(" >> ")[0];

        var result = await axios.get("https://pixabay.com/api", {
          params: {
            key: "18189243-7c0721c6a28aecbb420df8e49",
            q: categorytemp,
          },
        });

        const url =
          result.data.hits[0] == undefined
            ? "http://www.thestahlman.com/Common/images/jquery/galleria/image-not-found.png"
            : result.data.hits[0].webformatURL;
        // console.log(typeof url)
        axios({ method: "get", url: url, responseType: "stream" }).then(
          (image) => {
            image.data.pipe(
              fs.createWriteStream(
                path.join("./public", `${categorytemp}.jpg`),
                { flags: "a+" }
              )
            );
          }
        );

        tempArr1.push({
          name: categorytemp,
          count: 1,
          image: `http://localhost:5000/${categorytemp}.jpg`,
        });
      }
      // console.log();
      for (let i = 0; i < 12; i++) {
        productTemp = product[i].image[0].slice(2, -2).split('",')[0];
        console.log(product[i]._id);

        tempArr2.push({
          _id: product[i]._id,
          count: 1,
          image: productTemp,
          name: product[i].name,
        });
      }
      const tempdata = miscModel({
        categoriesCount: tempArr1,
        productCount: tempArr2,
      });

      tempdata.save().catch((e) => {
        console.log(e);
      });
    });
});

app.get("/",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"client","build","index.html"));
})

app.get("/topcategoriesandsellers", (req, res) => {
  miscModel
    .find()
    .then((result) => {
      return res.send(result);
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).send();
    });
});

app.get("/getproduct/:id", (req, res) => {
  const _id = req.params.id;

  productModel
    .findOne({ _id })
    .then((result) => {
      return res.send(result);
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).send();
    });
});

app.post("/autocomplete", (req, res) => {
  const { q } = req.body;

  productModel
    .find({ name: new RegExp(q, "i") }, { _id: 1, name: 1 })
    .limit(4)
    .then((result) => {
      return res.send(result);
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).send();
    });
});

app.post("/search", (req, res) => {
  // console.log([req.body, req.params]);
  const { q, skip, limit } = req.body;
  productModel
    .find({ name: new RegExp(decodeURIComponent(q), "i") })
    .skip(Number.parseInt(skip))
    .limit(Number.parseInt(limit))
    .then((result) => {
      return res.send(result);
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).send();
    });
});

app.post("/addtocart", (req, res) => {
  const { userId, productId } = req.body;

  userModel
    .findOne({ _id: userId })
    .then((user) => {
      //check if product is available
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i] == productId) return res.send();
      }

      user.cart.push(productId);
      userModel
        .updateOne({ _id: userId }, { cart: user.cart })
        .then(() => {
          return res.send();
        })
        .catch((e) => {
          console.log(e);
          return res.status(500).send();
        });
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).send();
    });
});

app.post("/getcart", (req, res) => {
  const { userId } = req.body;

  userModel
    .findOne({ _id: Object(userId) })
    .populate("cart")
    .then((user) => {
      res.send(user.cart);
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).send();
    });
});

app.post("/removefromcart", (req, res) => {
  const { userId, productId } = req.body;

  userModel.findOne({ _id: userId }).then((user) => {
    user.cart = user.cart.filter((item) => {
      if (item != productId) return true;
    });

    userModel
      .updateOne({ _id: userId }, { cart: user.cart })
      .then(() => res.send())
      .catch((e) => {
        console.log(e);
        return res.status(500).send();
      });
  });
});

app.post("/createUser", (req, res) => {
  const { name, email, password, address, phone } = req.body;

  bcrypt.hash(password, 10, function (err, hash) {
    const tempUser = userModel({
      name,
      email,
      password: hash,
      address,
      phone,
    });

    tempUser
      .save()
      .then((user) => {
        console.log(user);
        res.send(user._id);
      })
      .catch((e) => {
        res.status(500).send("errer");
        console.log(e);
        return;
      });
  });
});

app.post("/deposit", async (req, res) => {
  let paymentData = req.body;
  const order = new orderModel({
    date: Date.now(),
    status: "pending",
    txn: paymentData.amount,
    userId: paymentData.userId,
    productId: paymentData.productId,
  });

  order.save();

  var params = {};
  params["MID"] = PaytmConfig.mid;
  params["WEBSITE"] = PaytmConfig.website;
  params["CHANNEL_ID"] = "WEB";
  params["INDUSTRY_TYPE_ID"] = "Retail";
  params["ORDER_ID"] = order._id;
  params["CUST_ID"] = paymentData.userId;
  params["CALLBACK_URL"] = callbackURL;
  params["TXN_AMOUNT"] = paymentData.amount;
  // params["EMAIL"] = paymentData.custEmail;

  checksum_lib.genchecksum(params, PaytmConfig.key, (err, checksum) => {
    if (err) {
      console.log("Error: " + e);
    }

    var form_fields = "";
    for (var x in params) {
      form_fields +=
        "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
    }
    form_fields +=
      "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' +
        txn_url +
        '" name="f1">' +
        form_fields +
        '</form><script type="text/javascript">document.f1.submit();</script></body></html>'
    );
    res.end();
  });
});

// callback url for deposit
app.post("/paymentReceipt", (req, res) => {
  let responseData = req.body;
  var checksumhash = responseData.CHECKSUMHASH;

  var result = checksum_lib.verifychecksum(
    responseData,
    PaytmConfig.key,
    checksumhash
  );

  var orderedProduct;

  if (result) {
    if (responseData["STATUS"] == "TXN_SUCCESS") {
      //update order db and user ordered history
      orderModel.findOne({ _id: responseData["ORDERID"] }).then((order) => {
        if (!order) res.status(404).send();
        orderedProduct = order.productId;
        userModel.findOne({ _id: order.userId }).then((user) => {
          user.cart = user.cart.filter((cartProductId) => {
            for (let i = 0; i < order.productId.length; i++) {
              if (cartProductId == order.productId[i]) return true;
            }
          });

          userModel
            .updateOne({ _id: order.userId }, { cart: user.cart })
            .then(() => {
              orderModel
                .updateOne(
                  { _id: responseData["ORDERID"] },
                  { status: "Delivered" }
                )
                .then(() => res.redirect(301, "http://localhost:3000/cart"));
            });
        });
      });
    }
  }

  //update misc only one entry in misc that's why specific id
  miscModel.findOne({ _id: "5f7489cb4edbd127ecb816ac" }).then((misc) => {
    orderedProduct.forEach((productId) => {
      productModel.findOne({ _id: productId }).then((product) => {
        var orderFoundFlag = false,
          productFoundFlag = false,
          productCategory = product.categoriesTree
            .slice(2, -2)
            .split(" >> ")[0];

        //updating count
        misc.categoriesCount.forEach((ordered) => {
          if (ordered.name == productCategory) {
            ordered.count++;
            orderFoundFlag = true;
          }
        });

        if (!orderFoundFlag) {
          misc.push({
            name: productCategory,
            count: 1,
          });
        }
        //sorting on the basis of count
        misc.categoriesCount.sort((a, b) => {
          return b.count - a.count;
        });
        //updating count

        misc.productCount.forEach((product) => {
          console.log(typeof product._id);
          console.log(typeof productId);
          if (product._id.equals(productId)) {
            product.count++;
            productFoundFlag = true;
          }
        });

        if (!productFoundFlag) {
          misc.productCount.push({
            name: product.name,
            _id: product._id,
            image:product.image[0].slice(2, -2).split('",')[0],
            count: 1,
          });
        }

        //sorting on the basis of count
        misc.productCount.sort((a, b) => {
          return b.count - a.count;
        });

        console.log(misc.categoriesCount);
        console.log(misc.productCount);

        miscModel
          .updateOne(
            { _id: mongoose.Types.ObjectId("5f69b09eaa0090226c267928") },
            {
              $set: {
                categoriesCount: misc.categoriesCount,
                productCount: misc.productCount,
              },
            }
          )
          .then((updateMisc) => {
            console.log(updateMisc);
          });
      });
    });
  });
});

app.listen(5000, () => {
  console.log("server started");
});
