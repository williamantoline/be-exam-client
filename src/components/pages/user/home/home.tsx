import UserPageContent from "./content";
import Header from "../../../elements/header";
import Sidebar from "../../../elements/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
const Cookie = require("js-cookie");


interface Props{}

interface User {
    id: string,
    name: string,
    email: string,
    is_admin: boolean,
}

export default function UserHome(props: Props){
    
    const [loading, setLoading] = useState<Boolean>(true);
    const [user, setUser] = useState<User>();

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
            {/* <Header />
            <div className="d-flex">
                <Sidebar />
                <UserPageContent />
            </div> */}
            <div className="d-flex">
                <Sidebar active="home" user={user} />
                <div className="d-table">
                    <Header />
                    <UserPageContent />
                </div>
            </div>
            </>
        )
    }
    return <></>
}