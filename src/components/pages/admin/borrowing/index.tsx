import axios from "axios";
import { useEffect, useState } from "react";
import Flex from "../../../elements/flex";
import Sidebar from "../../../elements/sidebar";
import User from "../../../../models/User";
import Category from "../../../../models/Category";
import Book from "../../../../models/Book";
import Borrowing from "../../../../models/Borrowing";

const Cookie = require("js-cookie");

const logo  = require("../../../../assets/logo.png");

interface Props {}

export default function BorrowingPage(props: Props) {

    const [loading, setLoading] = useState<Boolean>(true);
    const [user, setUser] = useState<User>();


    useEffect(() => {
        axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, { name: 'John Doe' }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setUser(res.data.user);
            setLoading(false);
        })
        .catch((err: any) => {
            window.location.replace("/login");
        })
    }, []);


    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);

    const [categoryInput, setCategoryInput] = useState("");
    const handleCategoryInputChange = (e: any) => {
        setCategoryInput(e.target.value);
    }
    const [titleInput, setTitleInput] = useState("");
    const handleTitleInputChange = (e: any) => {
        setTitleInput(e.target.value);
    }
    const [authorInput, setAuthorInput] = useState("");
    const handleAuthorInputChange = (e: any) => {
        setAuthorInput(e.target.value);
    }
    const [publisherInput, setPublisherInput] = useState("");
    const handlePublisherInputChange = (e: any) => {
        setPublisherInput(e.target.value);
    }
    const [descriptionInput, setDescriptionInput] = useState("");
    const handleDescriptionInputChange = (e: any) => {
        setDescriptionInput(e.target.value);
    }
    const [pageInput, setPageInput] = useState("");
    const handlePageInputChange = (e: any) => {
        setPageInput(e.target.value);
    }
    const [languageInput, setLanguageInput] = useState("");
    const handleLanguageInputChange = (e: any) => {
        setLanguageInput(e.target.value);
    }
    const [stockInput, setStockInput] = useState("");
    const handleStockInputChange = (e: any) => {
        setStockInput(e.target.value);
    }

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedId, setSelectedId] = useState("");


    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/borrowings`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            setBorrowings(res.data.data);
            console.log(res.data);
        });
    }, [successMessage]);


    const resetForm = () => {
        setCategoryInput("");
        setTitleInput("");
        setAuthorInput("");
        setPublisherInput("");
        setDescriptionInput("");
        setPageInput("");
        setLanguageInput("");
        setStockInput("");
    }


    const handleAddBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.post(`http://127.0.0.1:3013/api/borrowings`, {
            title: titleInput,
            author: authorInput,
            language: languageInput,
            stock: stockInput,
            publisher: publisherInput,
            description: descriptionInput,
            page: pageInput,
            categoryId: categoryInput,
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
            resetForm();
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    const handleEditBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.put(`http://127.0.0.1:3013/api/borrowings/${selectedId}`, {
            title: titleInput,
            author: authorInput,
            language: languageInput,
            stock: stockInput,
            publisher: publisherInput,
            description: descriptionInput,
            page: pageInput,
            categoryId: categoryInput,
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
            resetForm();
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    const handleSelect = async (e: any) => {
        resetForm();
        await setSelectedId(e.target.id);
        await axios.get(`http://127.0.0.1:3013/api/borrowings/${e.target.id}`)
        .then((res: any) => {
            setTitleInput(res.data.data.title);
            setAuthorInput(res.data.data.author);
            setPublisherInput(res.data.data.publisher);
            setDescriptionInput(res.data.data.description);
            setPageInput(res.data.data.page);
            setLanguageInput(res.data.data.language);
            setStockInput(res.data.data.stock);
        })
        .catch((err: any) => {
            console.log(err);
        });
    } 

    const handleDeleteBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.delete(`http://127.0.0.1:3013/api/borrowings/${selectedId}`)
        .then((res: any) => {
            setSuccessMessage(res.data.message);
            resetForm();
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    if (user) {
        return (
            <>
            <Flex justify="flex-start">
                <Sidebar active="borrowings" user={user} />
                    <div className="mt-5 w-75">
                        <Flex justify="space-between">
                            <h2 className="">Borrowings</h2>
                            <button style={{height: 40}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add Book</button>
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
                                    <th scope="col">Created At</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Book</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    borrowings.length === 0
                                    ?
                                    <p>No Item</p>
                                    :
                                    borrowings.map((borrowing, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{new Date(borrowing.createdAt).toLocaleDateString()}</td>
                                                    <td>{borrowing.status}</td>
                                                    <td>{borrowing.user.name}</td>
                                                    <td>{borrowing.book.title}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button className="btn btn-primary btn-outline-secondary" style={{color: "white"}} id={borrowing.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#viewModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                </svg>
                                                                View
                                                            </button>
                                                            <button className="btn btn-warning btn-outline-secondary" style={{color: "black"}} data-bs-toggle="modal" id={borrowing.id} onClick={handleSelect} data-bs-target="#editModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                                                </svg> 
                                                                Edit
                                                            </button>
                                                            <button className="btn btn-danger btn-outline-secondary" style={{color: "white"}} id={borrowing.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#deleteModal">
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Borrowing</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <select onChange={handleCategoryInputChange} className="form-select" aria-label="Default select example">
                                        {/* {
                                            categories.map((category: Category) => {
                                                return (
                                                    <>
                                                        <option selected={categoryInput === category.id} value={category.id}>{category.name}</option>
                                                    </>
                                                )
                                            })
                                        } */}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title:</label>
                                    <input value={titleInput} onChange={handleTitleInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Author:</label>
                                    <input value={authorInput} onChange={handleAuthorInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Publisher:</label>
                                    <input value={publisherInput} onChange={handlePublisherInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Description:</label>
                                    <input value={descriptionInput} onChange={handleDescriptionInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Page:</label>
                                    <input value={pageInput} onChange={handlePageInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Language:</label>
                                    <input value={languageInput} onChange={handleLanguageInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Stock:</label>
                                    <input value={stockInput} onChange={handleStockInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddBook}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Book</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure want to delete this item?</p>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteBook}>Delete</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Book</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <select onChange={handleCategoryInputChange} className="form-select" aria-label="Default select example">
                                        {/* {
                                            categories.map((category: Category) => {
                                                return (
                                                    <>
                                                        <option selected={categoryInput === category.id} value={category.id}>{category.name}</option>
                                                    </>
                                                )
                                            })
                                        } */}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title:</label>
                                    <input value={titleInput} onChange={handleTitleInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Author:</label>
                                    <input value={authorInput} onChange={handleAuthorInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Publisher:</label>
                                    <input value={publisherInput} onChange={handlePublisherInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Description:</label>
                                    <input value={descriptionInput} onChange={handleDescriptionInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Page:</label>
                                    <input value={pageInput} onChange={handlePageInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Language:</label>
                                    <input value={languageInput} onChange={handleLanguageInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Stock:</label>
                                    <input value={stockInput} onChange={handleStockInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEditBook}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="viewModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Book Detail</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <select disabled onChange={handleCategoryInputChange} className="form-select" aria-label="Default select example">
                                        {/* {
                                            categories.map((category: Category) => {
                                                return (
                                                    <>
                                                        <option selected={categoryInput === category.id} value={category.id}>{category.name}</option>
                                                    </>
                                                )
                                            })
                                        } */}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title:</label>
                                    <input disabled value={titleInput} onChange={handleTitleInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Author:</label>
                                    <input disabled value={authorInput} onChange={handleAuthorInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Publisher:</label>
                                    <input disabled value={publisherInput} onChange={handlePublisherInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Description:</label>
                                    <input disabled value={descriptionInput} onChange={handleDescriptionInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Page:</label>
                                    <input disabled value={pageInput} onChange={handlePageInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Language:</label>
                                    <input disabled value={languageInput} onChange={handleLanguageInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Stock:</label>
                                    <input disabled value={stockInput} onChange={handleStockInputChange} type="text" className="form-control" id="recipient-name" />
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