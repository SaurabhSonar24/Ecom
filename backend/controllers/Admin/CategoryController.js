
const categorymodel = require("../../db/CategorySchema")
const subcategorymodel = require("../../db/SubCategorySchema")

const addcategory = (req, res) => {
    const { category } = req.body;
    let ins = new categorymodel({ category_name: category });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.json({ "err": 0, "msg": "Category Exists. Enter Into Existing category" })
        }
        else {

            res.json({ "err": 0, "msg": "Category Added" })
        }
    })
}
const addsubcategory = (req, res) => {
    // console.log(req.body)
    const { subcat, cat } = req.body;
    categorymodel.findOne({ category_name: cat }, (err, data) => {
        if (err) throw err;
        let ins = new subcategorymodel({ subcategory_name: subcat, category_id: data._id });
        ins.save((err) => {
            if (err) {
                console.log(err)
                console.log("Already added")
            }
            else {

                res.json({ "err": 0, "msg": "SubCategory Added" })
            }
        })

    })
}

const fetchcatsubcat = async (req, res) => {


    let categorydata = await categorymodel.find({});
    let subcatdata = await subcategorymodel.find({});
    console.log(categorydata)
    res.json({ "cat": categorydata, "subcat": subcatdata })

}
const delsubcat = (req, res) => {
    const { id } = req.body;
    subcategorymodel.deleteOne({ _id: id }, (err, data) => {
        if (err) throw err;
        if (data.deletedCount) {
            res.json({ "err": 0, "msg": "SubCategory Deleted" })
        }
        else {
            res.json({ "err": 1, "msg": "Unable to delete" })
        }

    })
}
const updatesubcat = (req, res) => {
    const { id, editsub } = req.body;

    subcategorymodel.updateOne({ _id: id }, { $set: { "subcategory_name": editsub } }, (err, data) => {
        if (err) throw err;
        if (data.matchedCount == 1) {

            res.json({ "err": 0, "msg": "SubCategory Updated" })
        }
        else {
            res.json({ "err": 1, "msg": "ID is not Matching with Database" })
        }
    })

}
const deletecat = (req, res) => {
    const { id } = req.body;
    subcategorymodel.deleteMany({ category_id: id }, (err, data) => {
        if (err) throw err;

    })
    categorymodel.deleteOne({ _id: id }, (err, data) => {
        if (err) throw err;
        if (data.deletedCount) {
            res.json({ "err": 0, "msg": "Category Deleted" })
        }
        else {
            res.json({ "err": 1, "msg": "Unable to delete" })
        }

    })

}

module.exports = { addcategory, addsubcategory, fetchcatsubcat, delsubcat, updatesubcat, deletecat }