import React, { useState } from 'react'
import AdminNavBar from '../AdminNavBar'
import { addcategory,addsubcategory } from '../../../config/MyServices'
import {useHistory} from 'react-router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function () {
    const [bool, setbool] = useState(0)
    const [category, setCat] = useState('')
    const [subcat, setsubCat] = useState('')
    const [loading, setloading] = useState(0)
    
    let History=useHistory()

    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });


    const AddCat = (e) => {
        e.preventDefault();
        if (category !== '') {
            localStorage.setItem("category",category)
            addcategory({ category: category })
                .then(res => {
                    // History.push("/addsubcat")
                    // console.log(res.data.err)   
                    success(res.data.msg)
                     document.getElementById("catin").disabled=true;
                     document.getElementById("catbtn").disabled=true;
                    setbool(1)
                    
                })
        }
        else {
            failure("Enter valid details")
        }
    }
    const addsubcat=(e)=>{
        e.preventDefault();
        if (subcat !== '') {
            // localStorage.setItem("category",category)
            addsubcategory({ subcat: subcat,cat:localStorage.getItem('category') })
                .then(res => {
                    console.log(res.data.err)
                    success(res.data.msg)
                    setbool(2)
                    
                })
        }
        else {
            failure("Enter valid details")
        }
    }

    const handler = (e) => {
        let { name, value } = e.target;
        switch (name) {
            case 'category':
                setCat(value)
                break

            case 'subcategory':
                setsubCat(value)
                break

        }
    }

    return (
        <div>
            <AdminNavBar />
            <div className="container-fluid ">
                <div className="col-md-6 col-lg-4 col-sm-12 mx-auto">

                    <h3 className="text-center">Add Categories</h3>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Enter Category</label>
                            <input type="text" name="category" onChange={handler} id="catin" className="form-control" placeholder="Enter Category here..." />

                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-outline-primary" id="catbtn" onClick={AddCat} >Submit Category</button>
                        </div>
                    </form><br /><br />
                    {
                        bool == 1 ?
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Enter Sub Category</label>
                                    <input type="text" name="subcategory" className="form-control"onChange={handler}/>

                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-outline-success" onClick={addsubcat} >Submit Sub Category</button>
                                </div>
                            </form> :
                            bool == 2 ?
                                <div className="text-center">
                                     <button type="submit" className="btn btn-outline-primary" onClick={()=>{
                                         setbool(1)
                                     }}>Add another subcategory</button>
                                     <button type="submit" className="btn btn-outline-primary " style={{marginLeft:"1vw"}}  onClick={()=>{
                                         localStorage.removeItem("category")
                                         success("Category and subcategory added")
                                         window.location.reload(false)
                                     }} >Done</button>
                                </div>:""

                    }


                </div>




            </div>
        </div>
    )
}
