import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../../elements/sidebar";
const Cookie = require("js-cookie");

interface Props {}

interface User {
    id: string,
    name: string,
    email: string,
    is_admin: boolean,
}

export default function Dashboard(props: Props) {

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

    // useEffect(() => {
    //     axios.post(`http://127.0.0.1:3013/api/auth/me`, { name: 'John Doe' }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': Cookie.get('token'),
    //         }
    //     })
    //     .then((res: any) => {
    //         console.log(res.data)
    //     })
    // }, []);

    if (user) {
        return (
            <>
                <Sidebar active="dashboard" user={user} />
            </>
        )
    } 
    return <></>
}