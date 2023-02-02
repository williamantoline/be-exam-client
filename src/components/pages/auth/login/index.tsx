import axios from "axios";
import { useEffect, useState } from "react";
import { UserType } from "../../../../enums/UserType";
const Cookie = require("js-cookie");

const logo  = require("../../../../assets/logo.png");

interface Props {}

export default function Login(props: Props) {
    const [emailInput, setEmailInput] = useState("");
    const handleEmailInputChange = (e: any) => {setEmailInput(e.target.value)};
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordInputChange = (e: any) => {setPasswordInput(e.target.value)};
    const [roleInput, setRoleInput] = useState(UserType.USER);
    const handleRoleInputChange = (e: any) => {setRoleInput(e.target.value)};
    const [rememberInput, setRememberInput] = useState(false);
    const handleRememberInputChange = (e: any) => {setRememberInput(!rememberInput)};

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
        await axios.post(`http://127.0.0.1:3013/api/auth/login`, {
            email: emailInput,
            password: passwordInput,
        })
        .then((res: any) => {
            Cookie.set('token', res.data.token);
            window.location.replace("/");
        })
        .catch((err: any) => {
            console.log(err);
            setPasswordInput("");
        })
    }

    return (
        <>
            <main className="form-signin w-100 m-auto">
                <form>
                    <img className="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-4 fw-normal">Please sign in</h1>

                    <div className="form-floating form-floating-up">
                        <input type="email" value={emailInput} onChange={handleEmailInputChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" value={passwordInput} onChange={handlePasswordInputChange} className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {/* <div className="form-floating form-floating-down">
                        <select id="floatingType" onChange={handleRoleInputChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                            <option selected={roleInput === UserType.USER} value={UserType.USER}>User</option>
                            <option selected={roleInput === UserType.ADMIN} value={UserType.ADMIN}>Admin</option>
                        </select>
                        <label htmlFor="floatingType">Type</label>
                    </div> */}

                    {/* <div className="checkbox mt-3 mb-5">
                    <label>
                        <input id="rememberMe" checked={rememberInput} onChange={handleRememberInputChange} type="checkbox" /> Remember me
                    </label>
                    </div> */}

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