import Book from "../../../elements/book";
import Quote from "../../../elements/quote";
import axios from "axios";
import { useEffect, useState } from "react";
import BookModel from "../../../../models/Book";
import Borrowing from "../../../../models/Borrowing";
const Cookie = require("js-cookie");

interface Props{}

export default function UserPageContent(props:Props){

    const [books, setBooks] = useState<BookModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [bookInput, setBookInput] = useState<BookModel>();
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/user/borrowings`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setBorrowings(res.data.data);
            setLoading(false);
        })
    }, [successMessage]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/books`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setBooks(res.data.data);
            setLoading(false);
        })
    }, [successMessage]);

    const [modalLoading, setModalLoading] = useState(false);


    const handleSelect = async (e: any) => {
        setModalLoading(true);
        await axios.get(`http://127.0.0.1:3013/api/books/${e.target.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setBookInput(res.data.data.id);
            setModalLoading(false);
        })
        .catch((err: any) => {
            alert(err.response.data.message);
        });
    }

    const handleBorrow = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.post(`http://127.0.0.1:3013/api/user/borrowings`, {
            bookId: bookInput,
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

    return(
        <main style={{ overflow: 'scroll', height: '100vh', width:'100%' }}>
            <section className="py-5 text-center container">
                <div className="row py-lg-5" style={{}}>
                    <h2>Welcome to Atheneum</h2>
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <Quote />
                    </div>
                </div>
                <div>
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
                    <h2>Borrowing List</h2>
                    <div style={{display: "flex"}}>
                        {
                            borrowings.map((borrowing: Borrowing) => {
                                return (
                                    <div className="card" style={{width: "18rem"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{borrowing.status}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{new Date(borrowing.createdAt).toLocaleDateString()}</h6>
                                            <p className="card-text">Book Title: {borrowing.book.title}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            <div className="py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {
                            books.map((book: BookModel) => {
                                return (
                                    <Book id={book.id} title={book.title} author={book.author} image={book.image} isAvailable={book.isAvailable} onClick={handleSelect} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="modal fade" id="bookModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Borrow Book</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure want to borrow this item?</p>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" disabled={modalLoading} onClick={handleBorrow}>Yes</button>
                        </div>
                        </div>
                    </div>
                </div>
        </main>
    )
}