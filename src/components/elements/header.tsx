import { css } from "../../styles/styles";
const Cookie = require("js-cookie");


interface Props{

}

export default function Header (props:Props){
    const handleSignOut = () => {
        Cookie.remove('token', { path: '' });
        window.location.replace("/login");
    }

    return(
        <header style={{height: "100%"}}>
                <div className="bg-dark collapse" id="navbarHeader" style={{backgroundImage: "url(/library.jpg)"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4 className="text-white">About</h4>
                                <p className="text-white mt-2 mb-4">Unlock endless knowledge from the comfort of your own space. With an extensive collection of books and digital resources, you can explore any topic that captures your interest. Immerse yourself in learning and discover new ideas in a peaceful and convenient environment.</p>
                                <p className="text-white">&#169;Atheneum, 2023.</p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <h4 className="text-white">Contact</h4>
                                <ul className="list-unstyled">
                                    <li><a href="/" className="text-white">Follow on Twitter</a></li>
                                    <li><a href="/" className="text-white">Like on Facebook</a></li>
                                    <li><a href="/" className="text-white">Email me</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <a href="/" className="navbar-brand d-flex align-items-center">
                            Atheneum
                        </a>
                        <button className="btn btn-secondary" onClick={handleSignOut}>
                            Sign Out
                        </button>
                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </header>
    )
}