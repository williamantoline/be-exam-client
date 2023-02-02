import axios from "axios";
import { useEffect, useState } from "react";
const Cookie = require("js-cookie");

const logo  = require("../../../../assets/logo.png");

interface Props {}

export default function Register(props: Props) {
    const [nameInput, setNameInput] = useState("");
    const handleNameInputChange = (e: any) => {setNameInput(e.target.value)};
    const [emailInput, setEmailInput] = useState("");
    const handleEmailInputChange = (e: any) => {setEmailInput(e.target.value)};
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordInputChange = (e: any) => {setPasswordInput(e.target.value)};
    const [cPasswordInput, setCPasswordInput] = useState("");
    const handleCPasswordInputChange = (e: any) => {setCPasswordInput(e.target.value)};
    // const [formError, setFormError] = useState([]);

    useEffect(() => {
        axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, { name: 'John Doe' }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any)=>{
            if(res.data.tokenStatus === true){
                window.location.replace("/");
            }
        })
    }, []);

    const handleButtonOnClick = async () => {
        if (passwordInput !== cPasswordInput) {
            alert("Password and password confirmation do not match!");
        }

        await axios.post(`http://127.0.0.1:3013/api/auth/register`, {
            name: nameInput,
            email: emailInput,
            password: passwordInput,
        })
        .then((res: any) => {
            Cookie.set('token', res.data.token);
            window.location.replace("/login");
        })
        .catch((err: any) => {
            console.log(err);
            setPasswordInput("");
            setCPasswordInput("");
        })
    }


    return (
        <>
            <main className="form-signin w-100 m-auto">
                <form>
                    <img className="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-4 fw-normal">Register</h1>

                    {/* {
                        formError.map((err: any) => {
                            return <p>{err.message}</p>
                        })
                    } */}

                    <div className="form-floating form-floating-up">
                        <input type="text" value={nameInput} onChange={handleNameInputChange} className="form-control" id="floatingName" placeholder="John Doe" />
                        <label htmlFor="floatingName">Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" value={emailInput} onChange={handleEmailInputChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" value={passwordInput} onChange={handlePasswordInputChange} className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating form-floating-down mb-4">
                        <input type="password" value={cPasswordInput} onChange={handleCPasswordInputChange} className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>

                    <div className="mt-3 mb-5">
                        <p>Already have an account? <a href="/login">Login</a></p>    
                    </div>

                    <button onClick={handleButtonOnClick} className="w-100 btn btn-lg btn-primary" type="button">Register</button>
                    <p className="mt-5 mb-3 text-muted">&copy; Perpustakaan 2023</p>
                </form>
            </main>
        </>
    )
}