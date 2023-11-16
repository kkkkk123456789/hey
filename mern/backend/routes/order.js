const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const Authuser = require("../middleware/authuser")

router.post("/pincode", async (req, res) => {
  if (req.method === "POST") {
    let pincode = req.body.pincode;
    if (pincode === "385535") {
      res
        .status(200)
        .json({ success: true, state: "Gujrat", city: "Banaskantha" });
      return;
    }
    res.status(200).json({ success: false, city: "", disc: "" });
    return;
  } else {
    res.status(200).json({ success: false, city: "", disc: "" });
    return;
  }
});

router.post("/createorder", async (req, res) => {
  const orderid = Math.floor(Math.random() * Date.now());
  if (req.method === "POST") {
    let totalprice = 0;
    for (let item in req.body.cart) {
      let product = await Product.findOne({ slug: item });
      totalprice = totalprice + product.price * req.body.cart[item].qty;
      if (product.availableQty < req.body.cart[item].qty) {
        res.status(200).json({
          sucess: false,
          message: "Some items in your cart went out of stock. Please try again",
        });
        return;
      }
    }
    if (!Number.isInteger(Number(req.body.userinfo.phone))) {
      res
        .status(200)
        .json({ sucess: false, message: "Enter a valid phone number" });
      return;
    }
    if (totalprice === req.body.subtotal) {
      const ordernew = new Order({
        email: req.body.userinfo.email,
        name: req.body.userinfo.name,
        phone: req.body.userinfo.phone,
        orderId: orderid,
        products: req.body.cart,
        paymentInfo: 'Cash On Delivery',
        status: 'COD',
        address:
          req.body.userinfo.address +
          "," +
          req.body.services.dis +
          "," +
          req.body.services.state,
        amount: req.body.subtotal,
      });
      await ordernew.save()
      res.status(200).json({ success: true, message:"Your order will be placed successfully",oid:orderid});
    }
    else{
        res.status(200).json({ success: false, message :"The price of some items in your cart have changed. Please try again"});
    }
  } else {
    res.status(500).json({ success: false, message :"Some error accured"});
  }
});

router.post("/myorders",Authuser,async(req,res)=>{
  let email = req.userdata.email;
  let orders = await Order.find({email})
  res.status(200).json({success:true,orders})
})

router.post("/myordersdetails",Authuser,async(req,res)=>{
  let email = req.userdata.email;
  let oid = req.body.oid
  let orders = await Order.find({email,orderId:oid})
  res.status(200).json({success:true,orders})
})
module.exports = router;
