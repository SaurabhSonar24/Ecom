import React, { useState, useEffect } from 'react'

import AdminNavBar from '../AdminNavBar'
import { productmainimage, productsubimages } from '../../../config/MyServices'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default function () {
    let History = useHistory();
    const [bool, setbool] = useState(0)
    const [mainimage, setmainimage] = useState('')
    const [subImg, setsubImg] = useState([])

    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });

    useEffect(() => {

        if (!localStorage.getItem('prodID')) {
            History.push("/admin/addproducts")
        }
    }, [])



    const handler = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'mainImg':
                setmainimage(e.target.files[0])
                console.log(e.target.files[0])
                break;
            case 'subImg':
                setsubImg(e.target.files)
                console.log(e.target.files)
                break
        }
    }
    const submitOne = () => {
        const formData = new FormData()
        formData.append('mainImg', mainimage)
        formData.append('ProdID', localStorage.getItem('prodID'))
        console.log(formData)
        productmainimage(formData)
            .then(res => {

                if (res.data.err == 0) {
                    success(res.data.msg)
                    document.getElementById("mainimg").disabled = true;
                    document.getElementById("mainimgsub").disabled = true;
                    setbool(1)

                }
                else {
                    failure(res.data.msg)
                }

            })
    }
    const submitMany = () => {
        const formData = new FormData()

        for (let i = 0; i < subImg.length; i++) {
            //  imgarr.push(subImg[i])
            formData.append('subImg', subImg[i])
        }


        formData.append('ProdID', localStorage.getItem('prodID'))
        console.log(formData)
        productsubimages(formData)
            .then(res => {

                if (res.data.err == 0) {
                    success(res.data.msg)
                    localStorage.clear()
                    History.push("/admin/addproducts")
                    setbool(1)

                }
                else {
                    failure(res.data.msg)
                }

            })
    }
    return (
        <div>
            <AdminNavBar/>
            <div className='container-fluid'>
                <div className="col-md-8 col-lg-8 col-sm-8 mx-auto card11" style={{ marginTop: "5vh", marginBottom: "5vh" }}>
                    <div>
                        <div class="d-flex bd-highlight">
                            <div class="p-2 w-100 bd-highlight ">
                                <div className="form-group">
                                    <h3 className="text-center">Upload Images</h3>
                                    <p className="text-center" >Select Main Image</p>
                                    <input type="file" id="mainimg" className="form-control" name="mainImg" onChange={handler} />
                                    <br />
                                    <div className="text-center">
                                        <button type="submit" id="mainimgsub" className="btn btn-primary" onClick={submitOne} style={{ marginBottom: "5vh" }}>Submit</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        bool ?
                            <div>
                                <hr />
                                <div class="d-flex bd-highlight">
                                    <div class="p-2 w-100 bd-highlight ">
                                        <div className="form-group" >
                                            <div >
                                                <p className="text-center" style={{ marginTop: "5vh", marginBottom: "5vh" }}>Select Sub Images</p>
                                                <input type="file" className="form-control" name="subImg" onChange={handler} multiple />
                                                <br />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary" onClick={submitMany} style={{ marginBottom: "5vh" }}>Submit</button>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div> : ""
                    }


                </div>

            </div>
        </div>
    )
}
