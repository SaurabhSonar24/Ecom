const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const multer = require("multer")
const categorycontroller = require("../../controllers/Admin/CategoryController")
const productcontroller = require("../../controllers/Admin/ProductController")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
router.post('/productmainimage', upload.single('mainImg'), productcontroller.productmainimage)

router.post('/productsubimages', upload.array('subImg',12), productcontroller.productsubimages)

router.post('/updateproductmainimage', upload.single('mainImg'), productcontroller.updateproductmainimage)

router.post('/updatesubimage',upload.single('sub'), productcontroller.updatesubimage)


router.get("/fetchcatsubcat", categorycontroller.fetchcatsubcat)

router.post("/productdata", [
    check('proddata.product_cost').isNumeric().withMessage('Check format'),
], productcontroller.productdata)

router.get("/fetchproducts", productcontroller.fetchproducts)

router.post("/deleteproduct", productcontroller.deleteproduct)

router.post("/editproductinfo", [
    check('productInfo.product_cost').isNumeric().withMessage('Check format'),
], productcontroller.editproductinfo)



module.exports = router;