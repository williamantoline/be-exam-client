import axios from "axios";
import { useEffect, useState } from "react";
import Flex from "../../../elements/flex";
import Sidebar from "../../../elements/sidebar";
import User from "../../../../models/User";
import Category from "../../../../models/Category";
import Book from "../../../../models/Book";

const Cookie = require("js-cookie");

const logo  = require("../../../../assets/logo.png");

interface Props {}

interface File {
    name: string,
}

export default function BookPage(props: Props) {

    const urlFormat = (a: string) => {
        return a.substring(7, a.length);
    }

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
    const [books, setBooks] = useState<Book[]>([]);

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
    const [pageInput, setPageInput] = useState(0);
    const handlePageInputChange = (e: any) => {
        setPageInput(parseInt(e.target.value));
    }
    const [languageInput, setLanguageInput] = useState("");
    const handleLanguageInputChange = (e: any) => {
        setLanguageInput(e.target.value);
    }

    const [fileInput, setFileInput] = useState<any>([]);
    const handleFileChange = (e: any) => {
        console.log(e.target.files);
        setFileInput(e.target.files[0]);
    }

    const [fileurl, setFileurl] = useState("");

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
            setCategoryInput(res.data.data[0].id);
            console.log(res.data);
        });
    }, [successMessage]);


    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/books`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            setBooks(res.data.data);
            console.log(res.data);
        });
    }, [successMessage]);


    const resetForm = () => {
        setCategoryInput("");
        setTitleInput("");
        setAuthorInput("");
        setPublisherInput("");
        setDescriptionInput("");
        setPageInput(0);
        setLanguageInput("");
        setFileurl("");
    }


    const handleAddBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        const formData = new FormData();
        formData.append("title", titleInput);
        formData.append("author", authorInput);
        formData.append("language", languageInput);
        formData.append("publisher", publisherInput);
        formData.append("description", descriptionInput);
        formData.append("page", String(pageInput));
        formData.append("categoryId", categoryInput);
        formData.append("image", fileInput, fileInput.name);

        await axios.post(`http://127.0.0.1:3013/api/books`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
            resetForm();
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message || err.response.data.errors[0].msg);
        });
    }

    const handleEditBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.put(`http://127.0.0.1:3013/api/books/${selectedId}`, {
            title: titleInput,
            author: authorInput,
            language: languageInput,
            publisher: publisherInput,
            description: descriptionInput,
            page: pageInput,
            categoryId: categoryInput,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
            resetForm();
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    const handleDeleteBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.delete(`http://127.0.0.1:3013/api/books/${selectedId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
            resetForm();
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    const [modalLoading, setModalLoading] = useState(false);

    const handleSelect = async (e: any) => {
        resetForm();
        setModalLoading(true);
        await axios.get(`http://127.0.0.1:3013/api/books/${e.target.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setTitleInput(res.data.data.title);
            setAuthorInput(res.data.data.author);
            setPublisherInput(res.data.data.publisher);
            setDescriptionInput(res.data.data.description);
            setPageInput(res.data.data.page);
            setLanguageInput(res.data.data.language);
            setFileurl(res.data.data.image);
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
                <Sidebar active="books" user={user} />
                    <div className="mt-5 w-75">
                        <Flex justify="space-between">
                            <h2 className="">Books</h2>
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
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Is Available</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    books.length === 0
                                    ?
                                    <p>No Item</p>
                                    :
                                    books.map((book, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{book.title}</td>
                                                    <td>{book.category?.name}</td>
                                                    <td>{book.isAvailable ? "Yes" : "No"}</td>
                                                    <td>{book.author}</td>
                                                    <td>{book.language}</td>
                                                    <td>{new Date(book.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button className="btn btn-primary btn-outline-secondary" style={{color: "white"}} id={book.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#viewModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                </svg>
                                                                View
                                                            </button>
                                                            <button className="btn btn-warning btn-outline-secondary" style={{color: "black"}} data-bs-toggle="modal" id={book.id} onClick={handleSelect} data-bs-target="#editModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                                                </svg> 
                                                                Edit
                                                            </button>
                                                            <button className="btn btn-danger btn-outline-secondary" style={{color: "white"}} id={book.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#deleteModal">
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Book</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <select onChange={handleCategoryInputChange} className="form-select" aria-label="Default select example">
                                        {
                                            categories.map((category: Category) => {
                                                return (
                                                    <>
                                                        <option selected={categoryInput === category.id} value={category.id}>{category.name}</option>
                                                    </>
                                                )
                                            })
                                        }
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
                                    <input value={pageInput} onChange={handlePageInputChange} type="number" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Language:</label>
                                    <input value={languageInput} onChange={handleLanguageInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="input-group">
                                    <input type="file" onChange={handleFileChange} className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
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
                                        {
                                            categories.map((category: Category) => {
                                                return (
                                                    <>
                                                        <option selected={categoryInput === category.id} value={category.id}>{category.name}</option>
                                                    </>
                                                )
                                            })
                                        }
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
                                    <input value={pageInput} onChange={handlePageInputChange} type="number" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Language:</label>
                                    <input value={languageInput} onChange={handleLanguageInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="input-group">
                                    <input type="file" onChange={handleFileChange} className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" id={selectedId} onClick={handleEditBook} disabled={modalLoading}>
                                {modalLoading ? 'Loading...' : 'Submit'}
                            </button>
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
                            {
                                modalLoading ? 
                                <>Loading...</>
                                :
                                (
                                    <form>
                                        <div className="mb-3">
                                            <select disabled onChange={handleCategoryInputChange} className="form-select" aria-label="Default select example">
                                                {
                                                    categories.map((category: Category) => {
                                                        return (
                                                            <>
                                                                <option selected={categoryInput === category.id} value={category.id}>{category.name}</option>
                                                            </>
                                                        )
                                                    })
                                                }
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
                                            <input disabled value={pageInput} onChange={handlePageInputChange} type="number" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="col-form-label">Language:</label>
                                            <input disabled value={languageInput} onChange={handleLanguageInputChange} type="text" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="input-group">
                                        <label htmlFor="name" className="col-form-label">Image:</label>
                                            <img className="w-100" src={`http://127.0.0.1:3013/${urlFormat(fileurl)}`} alt="" />
                                        </div>
                                    </form>
                                )
                            }
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