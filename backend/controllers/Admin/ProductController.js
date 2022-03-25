const categorymodel = require("../../db/CategorySchema")
const subcategorymodel = require("../../db/SubCategorySchema")
const productsmodel = require("../../db/ProductsSchema")
const { check, validationResult } = require('express-validator')
const fs = require('fs')

const productdata = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors.array())
        // return res.status(422).json({ errors: errors.array() })
        res.json({ "err": 1, "msg": "Please Enter valid Details" })
    }
    else {
        const { category, subcategory, product_name, product_desc, product_producer, product_cost } = req.body.proddata;
        console.log(product_name)
        let ins = new productsmodel({
            product_subImages: [], category_id: category, subcategory_id: subcategory, product_name: product_name,
            product_image: "", product_desc: product_desc, product_rating: 4, product_producer: product_producer, product_cost: product_cost
        });
        ins.save((err, data) => {
            if (err) {
                console.log(err)
                console.log("Already added")
            }
            else {
                console.log(data)
                res.json({ "err": 0, "msg": "Product Added", "data": data._id })
            }
        })
    }
}
const productmainimage = (req, res) => {
    const { ProdID } = req.body
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
    productsmodel.updateOne({ _id: ProdID }, { $set: { "product_image": url } }, (err, data) => {
        if (err) throw err;
        if (data.matchedCount == 1) {

            res.json({ "err": 0, "msg": "Product Main Image Uploaded" })
        }
        else {
            res.json({ "err": 1, "msg": "Product ID is not Matching with Database" })
        }
    })
}
const productsubimages = (req, res) => {
    //   console.log(req.files)
    const { ProdID } = req.body
    const url = []
    for (let i = 0; i < req.files.length; i++) {
        url.push(req.protocol + '://' + req.get('host') + '/Images/' + req.files[i].filename)
    }
    productsmodel.updateOne({ _id: ProdID }, { $set: { "product_subImages": url } }, (err, data) => {
        if (err) throw err;
        if (data.matchedCount == 1) {

            res.json({ "err": 0, "msg": "Product Sub Images Uploaded" })
        }
        else {
            res.json({ "err": 1, "msg": "Product ID is not Matching with Database" })
        }
    })

}
const fetchproducts = async (req, res) => {
    let products = await productsmodel.find({});
    res.json({ "data": products })
}

const deleteproduct = (req, res) => {
    const { id } = req.body;
    productsmodel.deleteOne({ _id: id }, (err, data) => {
        if (err) throw err;
        if (data.deletedCount) {
            res.json({ "err": 0, "msg": "Product Deleted" })
        }
        else {
            res.json({ "err": 1, "msg": "Unable to delete" })
        }

    })
}
const editproductinfo = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors.array())
        // return res.status(422).json({ errors: errors.array() })
        res.json({ "err": 1, "msg": "Please Enter valid Details" })
    }
    else {
        const { id, product_name, product_desc, product_producer, product_cost } = req.body.productInfo
        productsmodel.updateOne({ _id: id }, { $set: { "product_name": product_name, "product_desc": product_desc, "product_producer": product_producer, "product_cost": product_cost } }, (err, data) => {
            if (err) throw err;
            if (data.matchedCount == 1) {

                res.json({ "err": 0, "msg": "Product Info Updated" })
            }
            else {
                res.json({ "err": 1, "msg": "ID is not Matching with Database" })
            }
        })
    }


}
const updateproductmainimage = async (req, res) => {
    const { ProdID } = req.body
    let products = await productsmodel.findOne({ _id: ProdID });
   
    let result = products.product_image.substring(29);
    fs.unlinkSync("./Images/" + result)

    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
    productsmodel.findOneAndUpdate({_id:ProdID},{product_image:url},{new:true},(err,data)=>
    {
        if(err){
            console.log(err)
        }
        else{
            res.json({ "err": 0, "msg": "Product Main Image Uploaded", "mainIMG": data.product_image })
        }
    })
   

}
const updatesubimage=async(req,res)=>{
    // console.log(req.file)
     const {ProdID,index}=req.body;
     

     let products = await productsmodel.findOne({ _id: ProdID });
     console.log(products)
     
      let result = products.product_subImages[index].substring(29);
       fs.unlinkSync("./Images/" + result)
       let imgarr=products.product_subImages;
       imgarr[index]=req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
        
    productsmodel.findOneAndUpdate({_id:ProdID},{product_subImages:imgarr},{new:true},(err,data)=>
    {
        if(err){
            console.log(err)
        }
        else{
            res.json({ "err": 0, "msg": "Product Sub Image Uploaded", "subIMG": data.product_subImages })
        }
    })
   

}


module.exports = { productdata, productmainimage, productsubimages, fetchproducts, deleteproduct, editproductinfo, updateproductmainimage,updatesubimage }