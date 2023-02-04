import axios from "axios";
import { useEffect, useState } from "react";
import Flex from "../../../elements/flex";
import Sidebar from "../../../elements/sidebar";
const Cookie = require("js-cookie");

interface Props {}

interface User {
    id: string,
    name: string,
    email: string,
    is_admin: boolean,
}

export default function ProfilePage(props: Props) {

    const [loading, setLoading] = useState<Boolean>(true);
    const [user, setUser] = useState<User>();

    const [nameInput, setNameInput] = useState(user?.name);
    const [emailInput, setEmailInput] = useState(user?.email);
    const [passwordInput, setPasswordInput] = useState("");
    const [cPasswordInput, setCPasswordInput] = useState("");
    const handleNameInputChange = (e: any) => setNameInput(e.target.value);
    const handleEmailInputChange = (e: any) => setEmailInput(e.target.value);
    const handlePasswordInputChange = (e: any) => setPasswordInput(e.target.value);
    const handleCPasswordInputChange = (e: any) => setCPasswordInput(e.target.value);

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
    }, []);


    if (user) {
        return (
            <>
                <Flex justify="flex-start">
                    <Sidebar active="" user={user} />
                    <div className="mt-5 mx-4 w-25">
                        <h2>Profile Page</h2>
                        <form className="mt-4">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input disabled type="text" className="form-control" id="name" value={nameInput} onChange={handleNameInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input disabled type="email" className="form-control" id="email" value={emailInput}  onChange={handleEmailInputChange} />
                            </div>
                            <div className="mb-3" hidden>
                                <label htmlFor="password" className="form-label">Password</label>
                                <input disabled type="password" className="form-control" id="password" value={passwordInput} onChange={handlePasswordInputChange} />
                            </div>
                            <div className="mb-3" hidden>
                                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                <input disabled type="password" className="form-control" id="cpassword" value={cPasswordInput} onChange={handleCPasswordInputChange} />
                            </div>
                        </form>
                    </div>
                </Flex>
            </>
        )
    }
    return <></>
}