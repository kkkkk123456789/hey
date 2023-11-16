const express = require('express');
const router = express.Router()
const Product = require('../models/Product');

router.post("/product",async(req,res)=>{
  if(req.method === "POST"){
    let data = await Product.findOne({slug:req.body.slug})
    let variants = await Product.find({ title: data.title, category: data.category,gender: data.gender});
    let colorsizeSlug = {};
    for (let item of variants) {
      if (Object.keys(colorsizeSlug).includes(item.color)) {
        colorsizeSlug[item.color][item.size] = { slug: item.slug,img:item.image };
      }
      else {
        colorsizeSlug[item.color] = {}
        colorsizeSlug[item.color][item.size] = { slug: item.slug,img:item.image }
      }
    }
    res.status(200).json({data:data,colorsizeSlug:colorsizeSlug,variants})
  }
  else{
    res.status(200).json({data:{},colorsizeSlug:{}})
  }
})

router.post("/allproduct",async(req,res)=>{
  let gen = req.body.gender
  let data = await Product.find({gender:gen})
  res.status(200).json({data:data})
})

router.post("/addproduct",async(req,res)=>{
  // let {slug,title,desc,category,color,size,price,discount,availableQty,image,gender} = req.body
  let newprod = new Product(req.body)
  await newprod.save()
  res.status(200).json({success:true, message:"Product added successfully"})
})
module.exports = router