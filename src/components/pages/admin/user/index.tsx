import axios from "axios";
import { useEffect, useState } from "react";
import Flex from "../../../elements/flex";
import Sidebar from "../../../elements/sidebar";
import User from "../../../../models/User";
const Cookie = require("js-cookie");

interface Props {}


export default function UserPage(props: Props) {

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
            setUser(res.data.user);
            setLoading(false);
        })
    }, []);


    const [users, setUsers] = useState<User[]>([]);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const handleNameInputChange = (e: any) => {
        setNameInput(e.target.value);
    }
    const handleEmailInputChange = (e: any) => {
        setEmailInput(e.target.value);
    }
    

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedId, setSelectedId] = useState("");


    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/users`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            console.log(res.data.data);
            setUsers(res.data.data);
            console.log(res.data);
        });
    }, [successMessage]);

    const handleAddUser = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.post(`http://127.0.0.1:3013/api/auth/register`, {
            name: nameInput,
            email: emailInput,
            password: "rahasia" + nameInput,
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

    const handleEditUser = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.put(`http://127.0.0.1:3013/api/users/${selectedId}`, {
            name: nameInput,
        })
        .then((res: any) => {
            setSuccessMessage(res.data.message);
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    const handleSelect = async (e: any) => {
        await setSelectedId(e.target.id);
        await axios.get(`http://127.0.0.1:3013/api/users/${e.target.id}`)
        .then((res: any) => {
            setNameInput(res.data.data.name);
        })
        .catch((err: any) => {
            console.log(err);
        });
    } 

    const handleDeleteUser = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        await axios.delete(`http://127.0.0.1:3013/api/users/${selectedId}`)
        .then((res: any) => {
            setSuccessMessage(res.data.message);
        })
        .catch((err: any) => {
            setErrorMessage(err.response.data.message);
        });
    }

    if (user) {
        return (
            <>
            <Flex justify="flex-start">
                <Sidebar active="users" user={user} />
                    <div className="mt-5 w-75">
                        <Flex justify="space-between">
                            <h2 className="">Users</h2>
                            <button style={{height: 40}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add User</button>
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
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.length === 0
                                    ?
                                    <p>No Item</p>
                                    :
                                    users.map((user, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.is_admin ? "Admin" : "User"}</td>
                                                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button className="btn btn-primary btn-outline-secondary" style={{color: "white"}} id={user.id} onClick={handleSelect} data-bs-toggle="modal" data-bs-target="#viewModal">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                </svg>
                                                                View
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Name:</label>
                                    <input value={nameInput} onChange={handleNameInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Email:</label>
                                    <input value={emailInput} onChange={handleEmailInputChange} type="text" className="form-control" id="recipient-name" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddUser}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure want to delete this item?</p>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteUser}>Delete</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
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
                            <button style={{cursor: "pointer"}} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEditUser}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="viewModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">User Detail</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Name:</label>
                                    <input disabled value={user?.name} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Email:</label>
                                    <input disabled value={user?.email} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Role:</label>
                                    <input disabled value={user?.is_admin ? 'Admin' : 'User'} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Created At:</label>
                                    <input disabled value={new Date(user?.createdAt).toLocaleDateString()} type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Role:</label>
                                    <input disabled value={new Date(user?.updatedAt).toLocaleDateString()} type="text" className="form-control" id="recipient-name" />
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