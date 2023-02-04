import axios from "axios";
import { useEffect, useState } from "react";
import Flex from "../../../elements/flex";
import Sidebar from "../../../elements/sidebar";
import User from "../../../../models/User";
import Category from "../../../../models/Category";
const Cookie = require("js-cookie");

interface Props {}

export default function CategoryPage(props: Props) {

    const [loading, setLoading] = useState<Boolean>(true);
    const [user, setUser] = useState<User>();


    useEffect(() => {
        axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            if (res.data.is_admin === false) {
                window.location.replace("/");
            }
            setUser(res.data.user);
            setLoading(false);
        })
    }, []);


    const [categories, setCategories] = useState<Category[]>([]);
    const [nameInput, setNameInput] = useState("");
    const handleNameInputChange = (e: any) => {
        setNameInput(e.target.value);
    }

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedId, setSelectedId] = useState("");


    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/categories`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            setCategories(res.data.data);
            console.log(res.data);
        });
    }, [successMessage]);


    const handleAddCategory = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.post(`http://127.0.0.1:3013/api/categories`, {
            name: nameInput,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    const handleEditCategory = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.put(`http://127.0.0.1:3013/api/categories/${selectedId}`, {
            name: nameInput,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    const handleDeleteCategory = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.delete(`http://127.0.0.1:3013/api/categories/${selectedId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }


    const resetForm = () => {
        setNameInput("");
    }

    const [modalLoading, setModalLoading] = useState(false);

    const handleSelect = async (e: any) => {
        resetForm();
        setModalLoading(true);
        await axios.get(`http://127.0.0.1:3013/api/categories/${e.target.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setNameInput(res.data.data.name);
            setSelectedId(res.data.data.id);
            setModalLoading(false);
        })
        .catch((err: any) => {
            alert(err.response.data.message);
            console.log(err);
        });
    }

    if (user) {
        return (
            <>
            <Flex justify="flex-start">
                <Sidebar active="categories" user={user} />
                    <div className="mt-5 w-75">
                        <Flex justify="space-between">
                            <h2 className="">Categories</h2>
                            <button style={{height: 40}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add Category</button>
                        </Flex>
                        {
                            successMessage ? 
                            <div className="mt-2 alert alert-success" role="alert">
                                {successMessage}
                            </div> :
                            <></>
                        }
                        {
                            errorMessage ? 
                            <div className="mt-2 alert alert-danger" role="alert">
                                {errorMessage}
                            </div> :
                            <></>
                        }
                        <table className="mt-5 table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Books</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.length === 0
                                    ?
                                    <p>No Item</p>
                                    :
                                    categories.map((category, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{category.name}</td>
                                                    <td>{category.books.length}</td>
                                                    <td>{new Date(category.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button className="btn btn-primary btn-outline-secondary" style={{color: "white"}} id={category.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#viewModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                </svg>
                                                                View
                                                            </button>
                                                            <button className="btn btn-warning btn-outline-secondary" style={{color: "black"}} data-bs-toggle="modal" id={category.id} onClick={handleSelect} data-bs-target="#editModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                                                </svg> 
                                                                Edit
                                                            </button>
                                                            <button className="btn btn-danger btn-outline-secondary" style={{color: "white"}} id={category.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })
                                }
                                    
                            </tbody>
                        </table>
                    </div>
                </Flex>
                <div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Name:</label>
                                    <input value={nameInput} onChange={handleNameInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddCategory}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure want to delete this item?</p>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteCategory}>Delete</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Name:</label>
                                    <input value={nameInput} onChange={handleNameInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEditCategory}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="viewModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Category Detail</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Name:</label>
                                    <input disabled value={nameInput} onChange={handleNameInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return <></>
}