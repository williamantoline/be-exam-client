import axios from "axios";
import { useEffect, useState } from "react";
import Flex from "../../../elements/flex";
import Sidebar from "../../../elements/sidebar";
import User from "../../../../models/User";
import Book from "../../../../models/Book";
import Borrowing from "../../../../models/Borrowing";

const Cookie = require("js-cookie");

const logo  = require("../../../../assets/logo.png");

interface Props {}

export default function BorrowingPage(props: Props) {

    const [loading, setLoading] = useState<Boolean>(true);
    const [user, setUser] = useState<User>();

    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);


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


    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setUsers(res.data.data);
            setUserInput(res.data.data[0].id);
            setLoading(false);
        })
        .catch((err: any) => {
        })
    }, []);


    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/books?isAvailable=true`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setBooks(res.data.data);
            setBookInput(res.data.data[0].id);
            setLoading(false);
        })
        .catch((err: any) => {
        })
    }, []);




    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);

    const [userInput, setUserInput] = useState("");
    const handleUserInputChange = (e: any) => {
        setUserInput(e.target.value);
    }
    const [bookInput, setBookInput] = useState("");
    const handleBookInputChange = (e: any) => {
        setBookInput(e.target.value);
    }

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedId, setSelectedId] = useState("");


    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/admin/borrowings`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            setBorrowings(res.data.data);
        });
    }, [successMessage]);


    const resetForm = () => {
        setUserInput("");
        setBookInput("");
    }


    const handleAddBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.post(`http://127.0.0.1:3013/api/admin/borrowings`, {
            userId: userInput,
            bookId: bookInput,
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

    const handleEditBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.put(`http://127.0.0.1:3013/api/admin/borrowings/${selectedId}`, {
            userId: userInput,
            bookId: bookInput,
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
            resetForm();
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    const [modalLoading, setModalLoading] = useState(true);

    const handleSelect = async (e: any) => {
        resetForm();
        setModalLoading(true);
        await axios.get(`http://127.0.0.1:3013/api/admin/borrowings/${e.target.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setUserInput(res.data.data.title);
            setBookInput(res.data.data.author);
            setSelectedId(res.data.data.id);
        })
        .catch((err: any) => {
            alert(err.response.data.message);
        });
    } 

    const handleDeleteBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.delete(`http://127.0.0.1:3013/api/admin/borrowings/${selectedId}`, {
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

    const handleReturnBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.patch(`http://127.0.0.1:3013/api/admin/borrowings/${selectedId}/return`, {}, {
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

    const handleTakenBook = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.patch(`http://127.0.0.1:3013/api/admin/borrowings/${selectedId}/taken`, {}, {
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

    if (user) {
        return (
            <>
            <Flex justify="flex-start">
                <Sidebar active="borrowings" user={user} />
                    <div className="mt-5 w-75">
                        <Flex justify="space-between">
                            <h2 className="">Borrowings</h2>
                            <button style={{height: 40}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add Borrowing</button>
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
                                                        <button disabled={borrowing.status !== 'Requested'} className="btn btn-primary btn-outline-secondary" style={{color: "white"}} id={borrowing.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#takenModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                                </svg>
                                                                Taken
                                                            </button>
                                                            <button disabled={borrowing.status !== 'Taken'} className="btn btn-primary btn-outline-secondary" style={{color: "white"}} id={borrowing.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#returnModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                                </svg>
                                                                Returned
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
                                    <label htmlFor="title" className="col-form-label">User:</label>
                                    <select onChange={handleUserInputChange} className="form-select" aria-label="Default select example">
                                        {
                                            users.map((user: User) => {
                                                return (
                                                    <>
                                                        <option selected={userInput === user.id} value={user.id}>{user.name}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Book:</label>
                                    <select onChange={handleBookInputChange} className="form-select" aria-label="Default select example">
                                        {
                                            books.map((book: Book) => {
                                                return (
                                                    <>
                                                        <option selected={bookInput === book.id} value={book.id}>{book.title}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
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
                <div className="modal fade" id="returnModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Return Book</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Is the book returned?</p>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleReturnBook}>Confirm</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="takenModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Taken Book</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Is the book taken?</p>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleTakenBook}>Confirm</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return <></>
}