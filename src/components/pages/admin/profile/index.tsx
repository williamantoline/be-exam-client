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

    useEffect(() => {
        setNameInput(user?.name);
        setEmailInput(user?.email);
        setPasswordInput("");
    }, [user]);

    const [isEditMode, setIsEditMode] = useState(false);


    const handleSave = async () => {
        await axios.patch(`http://127.0.0.1:3013/api/auth/edit`, {
            name: nameInput,
            email: emailInput,
            password: passwordInput,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
    }

    const handleButtonClick = () => {
        setIsEditMode(!isEditMode);
        if (isEditMode) {
            handleSave();
        }
    }


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
                                <input disabled={!isEditMode} type="text" className="form-control" id="name" value={nameInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input disabled={!isEditMode} type="email" className="form-control" id="email" value={emailInput} />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input disabled type="password" className="form-control" id="password" />
                            </div> */}
                            <button type="button" onClick={handleButtonClick} className="mt-3 btn btn-primary">{isEditMode ? 'Save' : 'Edit'}</button>
                        </form>
                    </div>
                </Flex>
            </>
        )
    }
    return <></>
}