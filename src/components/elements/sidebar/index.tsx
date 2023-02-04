import { Link } from "react-router-dom";
const Cookie = require("js-cookie");

interface User {
    id: string,
    name: string,
    email: string,
    is_admin: boolean,
}

interface Props {
    active: string,
    user: User,
    // notifications: any,
}

export default function Sidebar(props: Props) {

    const handleSignOut = () => {
        Cookie.remove('token', { path: '/', domain: 'localhost' });
        window.location.replace("/login");
    }

    return (
        <>
            <main className="d-flex flex-nowrap">
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: 280}}>
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
                        <span className="fs-4">Perpustakaan</span>
                    </a>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        {/* <li className="nav-item">
                            <Link to="/admin/dashboard">
                                <div className={props.active === "dashboard" ? "nav-link active" : "nav-link link-dark"} aria-current="page">
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"/></svg>
                                    Dashboard
                                </div>
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/admin/users">
                                <div className={props.active === "users" ? "nav-link active" : "nav-link link-dark"} aria-current="page">
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"/></svg>
                                    Users
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/categories">
                                <div className={props.active === "categories" ? "nav-link active" : "nav-link link-dark"}>
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"/></svg>
                                    Categories
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/books">
                                <div className={props.active === "books" ? "nav-link active" : "nav-link link-dark"}>
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"/></svg>
                                    Books
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/borrowings">
                                <div className={props.active === "borrowings" ? "nav-link active" : "nav-link link-dark"}>
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"/></svg>
                                    Borrowings
                                </div>
                            </Link>
                            
                        </li>
                        <li>
                            <Link to="/admin/notifications">
                                <div className={props.active === "notifications" ? "nav-link active" : "nav-link link-dark"}>
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"/></svg>
                                    Notifications 
                                    {/* <span className="badge text-bg-secondary">{props.notifications.length}</span> */}
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                        <a href="/" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="rounded-circle me-2 bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            <strong>{props.user.name}</strong>
                        </a>
                        <ul className="dropdown-menu text-small shadow">
                            <li>
                                <Link to="/admin/profile">
                                    <div className="dropdown-item">Profile</div>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <div className="dropdown-item" style={{cursor: "pointer"}} onClick={handleSignOut}>Sign Out</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="b-example-vr"></div>
            </main>
        </>
    );
}