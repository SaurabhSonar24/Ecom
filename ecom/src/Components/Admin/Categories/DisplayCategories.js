import React, { useState, useEffect } from 'react'
import AdminNavBar from '../AdminNavBar'
import { fetchcatsubcat, delsubcat,updatesubcat,deletecat } from '../../../config/MyServices'
import { Accordion, Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




toast.configure()

export default function () {
    const [cat, setcat] = useState([])
    const [subcat, setsubcat] = useState([])
    const [editsub,seteditsub]= useState('')
    const [ID,setID]=useState('')
    const [show, setShow] = useState(0)
    const [show1, setShow1] = useState(0)

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

    const deletesubcat = (id) => {
        console.log(id)
        delsubcat({ id: id })
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
    const Editsub=(event)=>{
        event.preventDefault();
        updatesubcat({ id: ID,editsub:editsub })
        .then(res => {
            if (res.data.err == 0) {
                success(res.data.msg)
                fetchall()
                setShow(0)
            }
            else {
                failure(res.data.msg)
            }
        })


    
    }
    const deletecategory=(e)=>{
        e.preventDefault()
        console.log(ID)
        deletecat({ id: ID})
        .then(res => {
            if (res.data.err == 0) {
                success(res.data.msg)
                fetchall()
                setShow1(0)
            }
            else {
                failure(res.data.msg)
            }
        })
    }

    return (
        <div>
            <AdminNavBar />
            <div className='container-fluid'>
                <div className="col-md-8 col-lg-8 col-sm-6 mx-auto" style={{ marginTop: "5vh" }}>
                    {
                        cat.map((data, index) =>
                            <Accordion defaultActiveKey="0" className="card11">
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>
                                        <div className="container-fluid">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                        <span style={{fontSize:"5vh",fontFamily:"'Abril Fatface', cursive"}}>{data.category_name}</span>
                                    <button type='button' className="btn btn-outline-danger accbtn" onClick={()=>{
                                        setShow1(1)
                                        setID(data._id)
                                    }} >Delete</button> 
                                    <Modal show={show1}
                                        // onHide={handleClose}
                                        >
                                            <Modal.Header >
                                                <Modal.Title>Alert</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Do you really want to delete this category?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => {
                                                    setShow1(0)
                                                }}>
                                                    Close
                                                </Button>
                                                <Button variant="danger " onClick={deletecategory} >
                                                    Delete Anyhow
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                        </div>
                                      
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <table className="table table-light table-sm table-responsive table-bordered ">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">
                                                        No.
                                                    </th>
                                                    <th className="text-center">
                                                        subcategories
                                                    </th>
                                                    <th className="text-center">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    subcat.filter((data1) => {
                                                        if (data._id == data1.category_id) {
                                                            return data1;
                                                        }
                                                    }).map((data1, index1) =>
                                                        // <ul>
                                                        //            <li>{data1.subcategory_name}</li>
                                                        //          </ul>
                                                        <tr>
                                                            <td className="text-center">{index1 + 1}</td>
                                                            <td className="text-center">{data1.subcategory_name}</td>
                                                            <td className="text-center">
                                                                <button type="submit" className="btn btn-outline-danger" onClick={() => deletesubcat(data1._id)} >Delete</button>&nbsp;&nbsp;
                                                                <button type="submit" className="btn btn-outline-dark" onClick={() => {
                                                                    setShow(1)
                                                                    seteditsub(data1.subcategory_name)
                                                                    setID(data1._id)
                                                                    }} >Edit</button>
                                                                <Modal show={show}
                                                                // onHide={handleClose}
                                                                >
                                                                    <Modal.Header >
                                                                        <Modal.Title>Edit </Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <form>
                                                                            <div className="mb-3">
                                                                                <label className="form-label">Edit Sub Category</label>
                                                                                <input type="text" name="subcategory" className="form-control" defaultValue={editsub} 
                                                                                onChange={(e) => {

    
                                                                                    console.log(e.target.value)
                                                                                    seteditsub(e.target.value)
                                
                                                                                }}
                                                                                />

                                                                            </div>
                                                                            <div className="text-center">
                                                                                <button type='button' className="btn btn-outline-success" onClick={Editsub} >Submit</button>
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
                                                            </td>
                                                        </tr>

                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                        )}
                </div>

            </div>
        </div>
    )
}
