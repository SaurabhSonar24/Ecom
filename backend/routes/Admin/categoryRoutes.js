const express = require('express')
const router = express.Router();
const categorycontroller= require("../../controllers/Admin/CategoryController")

router.post("/addcategory", categorycontroller.addcategory)

router.post("/addsubcategory", categorycontroller.addsubcategory)

router.get("/fetchcatsubcat",  categorycontroller.fetchcatsubcat)

router.post("/delsubcat",  categorycontroller.delsubcat)

router.post("/updatesubcat",  categorycontroller.updatesubcat)

router.post("/deletecat",  categorycontroller.deletecat)



module.exports = router;