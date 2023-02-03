import axios from "axios";
import { useEffect, useState } from "react";
const Cookie = require("js-cookie");

const logo  = require("../../../../assets/logo.png");

interface Props {}

export default function Login(props: Props) {
    const [emailInput, setEmailInput] = useState("");
    const handleEmailInputChange = (e: any) => {setEmailInput(e.target.value)};
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordInputChange = (e: any) => {setPasswordInput(e.target.value)};

    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const [_, set_] = useState(false);


    useEffect(() => {
        axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, { name: 'John Doe' }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token') ?? undefined,
            }
        })
        .then((res: any) => {
            if(res.data.tokenStatus === true){
                if (res.data.is_admin) {
                    window.location.replace("/admin/users");
                } else {
                    window.location.replace("/home");
                }
            }
        })
        .catch((err: any) => {
            setIsError(true);
            setError(err.response.data.message);
        })
    }, [_]);


    const handleButtonOnClick = async () => {
        await axios.post(`http://127.0.0.1:3013/api/auth/login`, {
            email: emailInput,
            password: passwordInput,
        })
        .then((res: any) => {
            Cookie.set('token', res.data.token);
            set_(true);
        })
        .catch((err: any) => {
            setError(err.response.data.message);
            setIsError(true);
            setPasswordInput("");
        })
    }


    return (
        <>
            <main className="form-signin w-100 m-auto">
                <form>
                    <img className="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-4 fw-normal">Please sign in</h1>

                    {
                        isError ? 
                        (
                            <div className="my-4 alert alert-danger" role="alert">
                                {error}
                            </div>
                        ) :
                        <></>
                    }

                    <div className="form-floating form-floating-up">
                        <input type="email" value={emailInput} onChange={handleEmailInputChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" value={passwordInput} onChange={handlePasswordInputChange} className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="mt-3 mb-5">
                        <p>Don't have an account? <a href="/register">Register</a></p>    
                    </div>
                    <button onClick={handleButtonOnClick} className="w-100 btn btn-lg btn-primary" type="button">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; Perpustakaan 2023</p>
                </form>
            </main>
        </>
    )
}