import React, { useState, useEffect } from 'react'
import { fetchproducts, fetchcatsubcat, deleteproduct, editproductinfo, updateproductmainimage,updatesubimage } from '../../../config/MyServices'
import { Accordion, Modal, Button, Table } from 'react-bootstrap'
import AdminNavBar from '../AdminNavBar'
import { Alert } from "@mui/material";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const regForName = RegExp(/^[a-zA-Z0-9 ]{2,30}$/);
const regForDesc = RegExp(/^[a-zA-Z0-9 ]{2,1000}$/);
const regForCost = RegExp(/^[0-9]*$/);




toast.configure()

export default function DisplayProducts() {
    const [show, setShow] = useState(0)
    const [show1, setShow1] = useState(0)
    const [show2, setShow2] = useState(0)
    const [errors, seterror] = useState('')
    const [bool, setbool] = useState(0)
    const [cat, setcat] = useState([])
    const [prod, setprod] = useState([])
    const [image, setImage] = useState('')
    const [proddetail, setproddetail] = useState({

        id: "", product_name: "", product_desc: "", product_producer: "", product_cost: 0, product_image: "", product_subImages: []
    })
    useEffect(() => {
        fetchall()
    }, [])


    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });


    const fetchall = () => {
        fetchcatsubcat()
            .then(res => {
                setcat(res.data.cat);
            })
        fetchproducts()
            .then(res => {
                // console.log(res.data.data)
                setprod(res.data.data);

            })

    }
    const deleteprod = (id) => {

        deleteproduct({ id: id })
            .then(res => {

                if (res.data.err == 0) {
                    success(res.data.msg)
                    fetchall()

                }
                else {
                    failure(res.data.msg)
                }

            })
    }
    const editinfo = () => {
        const { product_name, product_desc, product_producer, product_cost } = proddetail

        if (product_name !== "" && product_desc !== "" && product_producer !== "" && product_cost !== "") {
            editproductinfo({ productInfo: proddetail })
                .then(res => {

                    if (res.data.err == 0) {
                        success(res.data.msg)
                        setShow(0)
                        fetchall()

                    }
                    else {
                        failure(res.data.msg)
                    }

                })


        }
        else {
            failure("Enter Valid Details")
        }

    }
    const submitmainIMG = () => {
        
        if(image!==""){
            const formData = new FormData()
            formData.append('mainImg', image)
            formData.append('ProdID', proddetail.id)
            updateproductmainimage(formData)
                .then(res => {
    
                    if (res.data.err == 0) {
                        success(res.data.msg)
                        fetchall()
                        setproddetail({ ...proddetail, product_image: res.data.mainIMG })
                        setImage('')
    
                    }
                    else {
                        failure(res.data.msg)
                    }
    
                })
        }
        else{
            failure("Select Image First")
        }
       
    }
    const submitsubIMG = (index) => {
       
        if(image!==""){
            const formData = new FormData()
            formData.append('sub', image)
            formData.append('ProdID', proddetail.id)
            formData.append('index',index)
            updatesubimage(formData)
                .then(res => {
    
                    if (res.data.err == 0) {
                        success(res.data.msg)
                        fetchall()
                        setproddetail({ ...proddetail, product_subImages: res.data.subIMG })
                        setImage('')
    
                    }
                    else {
                        failure(res.data.msg)
                    }
    
                })
        }
        else{
            failure("Select Image First")
        }
       
    }

    return (
        <div>
            <AdminNavBar />
            <div>
                <div className='container-fluid'>
                    <div className="col-md-8 col-lg-8 col-sm-6 mx-auto" style={{ marginTop: "5vh" }}>
                        {
                            cat.map((data, index) =>
                                <Accordion defaultActiveKey="0" className="card11">
                                    <Accordion.Item eventKey={index}>
                                        <Accordion.Header>

                                            {data.category_name}

                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Table striped bordered hover responsive >
                                                <thead>
                                                    <tr>
                                                        <th >
                                                            No.
                                                        </th>
                                                        <th >
                                                            Product Name
                                                        </th>
                                                        <th >
                                                            Product Image
                                                        </th>
                                                        <th >
                                                            Product Description
                                                        </th>
                                                        <th >
                                                            Product Producer
                                                        </th>
                                                        <th >
                                                            Product Cost
                                                        </th>
                                                        <th colSpan={2} className="text-center">
                                                            Action
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        prod.filter((data1) => {
                                                            if (data._id == data1.category_id) {

                                                                return data1;
                                                            }

                                                        }).map((data1, index1) =>

                                                            <tr>
                                                                <td>{index1 + 1}</td>
                                                                <td>{data1.product_name}</td>
                                                                <td><img src={data1.product_image} height="100px" width="150px" /></td>
                                                                <td>{data1.product_desc}</td>
                                                                <td>{data1.product_producer}</td>
                                                                <td>{data1.product_cost}</td>
                                                                <td colSpan={2} style={{ width: "10vw" }}>
                                                                    <div className="text-center">
                                                                        <button type="submit" className="btn btn-outline-danger" onClick={() => deleteprod(data1._id)} >Delete</button><br /><br />
                                                                        <button type="submit" className="btn btn-outline-dark"
                                                                            onClick={() => {
                                                                                setShow1(1)
                                                                                setproddetail({
                                                                                    id: data1._id,
                                                                                    product_name: data1.product_name,
                                                                                    product_desc: data1.product_desc,
                                                                                    product_producer: data1.product_producer,
                                                                                    product_cost: data1.product_cost,
                                                                                    product_image: data1.product_image,
                                                                                    product_subImages: data1.product_subImages
                                                                                })

                                                                            }}
                                                                        >Edit</button>
                                                                    </div>
                                                                    <Modal show={show}
                                                                    // onHide={handleClose}
                                                                    >
                                                                        <Modal.Header >
                                                                            <Modal.Title>Edit Product Details</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <form>
                                                                                {errors.length > 1 && <Alert severity="warning" >{errors}</Alert>}<br />
                                                                                <div className="mb-3">
                                                                                    <label className="form-label">Product Name</label>
                                                                                    <input type="text" name="subcategory" defaultValue={proddetail.product_name} className="form-control"
                                                                                        onChange={(e) => {
                                                                                            let error1 = regForName.test(e.target.value) ? " " : "Product Name is required";
                                                                                            seterror(error1)
                                                                                            setproddetail({ ...proddetail, product_name: e.target.value })
                                                                                        }}
                                                                                    />

                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label className="form-label">Product Description</label>
                                                                                    <textarea type="text" name="subcategory" defaultValue={proddetail.product_desc} className="form-control"
                                                                                        onChange={(e) => {
                                                                                            let error2 = regForDesc.test(e.target.value) ? " " : "Product Description is required";
                                                                                            seterror(error2);

                                                                                            setproddetail({ ...proddetail, product_desc: e.target.value })
                                                                                        }}
                                                                                    />

                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label className="form-label">Product Producer</label>
                                                                                    <input type="text" name="subcategory" defaultValue={proddetail.product_producer} className="form-control"
                                                                                        onChange={(e) => {
                                                                                            let error3 = regForName.test(e.target.value) ? " " : "Product Producer is required";
                                                                                            seterror(error3);

                                                                                            setproddetail({ ...proddetail, product_producer: e.target.value })
                                                                                        }}
                                                                                    />

                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label className="form-label">Product Cost</label>
                                                                                    <input type="text" name="subcategory" defaultValue={proddetail.product_cost} className="form-control"
                                                                                        onChange={(e) => {
                                                                                            let error4 = regForCost.test(e.target.value) ? " " : "Enter Valid product cost";
                                                                                            seterror(error4);

                                                                                            setproddetail({ ...proddetail, product_cost: e.target.value })
                                                                                        }}
                                                                                    />

                                                                                </div>
                                                                                <div className="text-center">
                                                                                    <button type='button' className="btn btn-outline-success" onClick={editinfo}  >Submit</button>
                                                                                </div>
                                                                            </form>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={() => {
                                                                                setShow(0)
                                                                            }}>
                                                                                Close
                                                                            </Button>

                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                    <Modal show={show1}
                                                                    // onHide={handleClose}
                                                                    >
                                                                        <Modal.Header >
                                                                            <Modal.Title>Edit Options</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <div className="text-center">
                                                                                <button type="submit" className="btn btn-outline-primary"
                                                                                    onClick={() => {
                                                                                        setShow1(0)
                                                                                        setShow2(1)

                                                                                    }}
                                                                                >Edit Pictures</button>&nbsp;
                                                                                <button type="submit" className="btn btn-outline-success" onClick={() => {
                                                                                    setShow1(0)
                                                                                    setShow(1)

                                                                                }} >Edit Info</button>
                                                                            </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={() => {
                                                                                setShow1(0)
                                                                            }}>
                                                                                Close
                                                                            </Button>

                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                    <Modal show={show2}
                                                                    // onHide={handleClose}
                                                                    >
                                                                        <Modal.Header >
                                                                            <Modal.Title>Edit Images</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <div>
                                                                                <div className="d-flex p-2 bd-highlight">
                                                                                    <img src={proddetail.product_image} height="100px" width="150px" />
                                                                                    <div className="d-flex flex-column bd-highlight mb-3">
                                                                                        <div className="p-2 bd-highlight"><input type="file" id="mainimg" className="form-control" name="mainImg" onChange={
                                                                                            (e) => {
                                                                                                console.log(e.target.files[0])
                                                                                                setImage(e.target.files[0])

                                                                                            }
                                                                                        } /></div>
                                                                                        <div className="p-2 bd-highlight text-center"><button type="submit" id="mainimgsub" className="btn btn-primary" style={{ marginBottom: "5vh" }} onClick={submitmainIMG}>Submit</button></div>

                                                                                    </div>


                                                                                </div>
                                                                                <div className="table-wrapper-scroll-y my-custom-scrollbar tableFixHead">
                                                                                    {/* <div className="d-flex p-2 bd-highlight"> */}
                                                                                    <Table striped bordered hover responsive className="table table-bordered table-striped mb-0 " >
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <td>No.</td>
                                                                                                <td>Image</td>
                                                                                                <td>Option</td>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                proddetail.product_subImages.map((data2, index2) =>
                                                                                                    <tr>
                                                                                                        <td>{index2 + 1}</td>
                                                                                                        <td><img src={data2} height="100px" width="150px" /></td>
                                                                                                        <td>

                                                                                                            <div className="text-center"><input type="file" className="form-control" name="subImg"
                                                                                                                onChange={
                                                                                                                    (e) => {
                                                                                                                        console.log(e.target.files[0])
                                                                                                                        setImage(e.target.files[0])

                                                                                                                    }} />
                                                                                                                <button type="submit" className="btn btn-success" style={{ marginTop: "1vh" }} onClick={()=>submitsubIMG(index2)}>Submit</button></div>


                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )
                                                                                            }
                                                                                        </tbody>
                                                                                    </Table>
                                                                                </div>
                                                                                {/* </div> */}

                                                                            </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={() => {
                                                                                setShow2(0)
                                                                            }}>
                                                                                Close
                                                                            </Button>

                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                </td>
                                                            </tr>

                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
