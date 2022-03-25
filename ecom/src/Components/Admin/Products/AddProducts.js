import React, { useState, useEffect } from 'react'
import { fetchcatsubcat,productdata } from '../../../config/MyServices'
import AdminNavBar from '../AdminNavBar'
import { Alert } from "@mui/material";
import { useHistory } from 'react-router';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const regForName = RegExp(/^[a-zA-Z0-9 ]{2,30}$/);
const regForDesc = RegExp(/^[a-zA-Z0-9 ]{2,1000}$/);
const regForCost = RegExp(/^[0-9]*$/);


toast.configure()

export default function AddProducts() {

    let History=useHistory();
    const [cat, setcat] = useState([])
    const [subcat, setsubcat] = useState([])
    const [errors, seterror] = useState('');
    const [proddata, setproddata] = useState({
        category: "", subcategory: "", product_name: "", product_desc: "", product_producer: "",product_cost:""
    })

    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });

    useEffect(() => {
        fetchall()
    }, [])
    const fetchall = () => {
        fetchcatsubcat()
            .then(res => {
                setcat(res.data.cat);
                setsubcat(res.data.subcat)
            })
    }
    const handler = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'category':
                setproddata({ ...proddata, category: value })
                localStorage.setItem("categoryID", value)
                break

            case 'subcategory':
                setproddata({ ...proddata, subcategory: value })
                break
            case 'product_name':
                let error = regForName.test(value) ? " " : "Product Name is required";
                seterror(error);
                setproddata({ ...proddata, product_name: value })
                break;
            case 'product_desc':
                let error2 = regForDesc.test(value) ? " " : "Product description is required";
                seterror(error2);
                setproddata({ ...proddata, product_desc: value })
                break;
            case 'product_producer':
                let error3 = regForName.test(value) ? " " : "Product producer is required";
                seterror(error3);
                setproddata({ ...proddata, product_producer: value })
                break;
            case 'product_cost':
                let error4 = regForCost.test(value) ? " " : "Enter Valid product cost";
                seterror(error4);
                setproddata({ ...proddata, product_cost: value })
                break;
        }

    }
    const postproduct=()=>{
      const {category,subcategory,product_name,product_desc,product_producer,product_cost}=proddata;
        if(category!==""&&subcategory!==""&&product_name!==""&&product_desc!==""&&product_producer!==""&&product_cost!==""){
            productdata({proddata:proddata})
            .then(res => {
                if(res.data.err==1){
                 failure(res.data.msg)
                }
                else{
                    success(res.data.msg)
                    localStorage.setItem("prodID",res.data.data)
                    History.push("/admin/addimages")
                }
            })
        }
        else{
           failure("Enter Valid details")
        }
    }




    return (
        <div>
            <AdminNavBar />
            <div className="container-fluid">
                <div className="col-md-8 col-lg-8 col-sm-8 mx-auto card11" style={{ marginTop: "5vh",marginBottom:"5vh" }}>
                    <br/><h3 className="text-center">Product Information</h3>
                    <div class="d-flex bd-highlight">
                        <div class="p-2 w-50 bd-highlight ">
                            <p className="text-center">Categories</p>
                            <select class="form-select" aria-label="Default select example" name="category" onChange={handler}>
                                <option selected>Open this select menu</option>
                                {
                                    cat.map((data, index) =>
                                        <option value={data._id} key={index}>{data.category_name}</option>
                                    )
                                }

                            </select>
                        </div>
                        <div class="p-2 w-50 bd-highlight ">
                            <p className="text-center">Subcategories</p>
                            <select class="form-select" aria-label="Default select example" name="subcategory" onChange={handler}>
                                <option selected>Open this select menu</option>
                                {
                                    subcat.filter((data1) => {
                                        if (localStorage.getItem("categoryID") == data1.category_id) {
                                            return data1;
                                        }
                                    }).map((data1, index) =>
                                        <option value={data1._id} key={index}>{data1.subcategory_name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>


                    <br />
                    {errors.length > 1 && <Alert severity="warning" >{errors}</Alert>}<br />
                    <div class="d-flex bd-highlight">
                        <div class="p-2 w-100 bd-highlight ">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Product Name</label>
                                <input type="text" class="form-control" name="product_name" onChange={handler} />

                            </div>
                            <br />
                            <div class="form-group">
                                <label for="exampleInputPassword1">Product Description</label>
                                <textarea class="form-control" name="product_desc" onChange={handler} ></textarea>
                            </div>
                        </div>

                    </div>

                    <div class="d-flex bd-highlight">
                        <div class="p-2 w-50 bd-highlight ">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Product Producer</label>
                                <input type="text" class="form-control" name="product_producer" onChange={handler} />

                            </div>
                        </div>
                        <div class="p-2 w-50 bd-highlight ">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Product Cost</label>
                                <input type="text" class="form-control" name="product_cost" onChange={handler} />

                            </div>
                        </div>
                    </div>

                    <br />
                    <div className="text-center">
                        <button type="submit" class="btn btn-primary" onClick={postproduct}>Submit</button>
                    </div>
                    <br />

                </div >




            </div>
        </div>
    )
}
