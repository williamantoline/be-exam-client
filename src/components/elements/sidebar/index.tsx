import { Link } from "react-router-dom";

interface Props {}

export default function Sidebar(props: Props) {
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
                        <li className="nav-item">
                            <Link to="/categories">
                                <div className="nav-link active" aria-current="page">
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"/></svg>
                                    Dashboard
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories">
                                <div className="nav-link link-dark">
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"/></svg>
                                    Categories
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/books">
                                <div className="nav-link link-dark">
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"/></svg>
                                    Books
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/borrowings">
                                <div className="nav-link link-dark">
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"/></svg>
                                    Borrowings
                                </div>
                            </Link>
                            
                        </li>
                        <li>
                            <Link to="/notifications">
                                <div className="nav-link link-dark">
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"/></svg>
                                    Notifications
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                        <a href="/" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>mdo</strong>
                        </a>
                        <ul className="dropdown-menu text-small shadow">
                            <li>
                                <Link to="/profile">
                                    <div className="dropdown-item">Profile</div>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link to="/signout">
                                    <div className="dropdown-item">Sign Out</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="b-example-vr"></div>
            </main>
        </>
    );
}