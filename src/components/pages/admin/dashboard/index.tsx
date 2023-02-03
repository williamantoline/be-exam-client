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

    // useEffect(() => {
    //     axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, {}, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': Cookie.get('token'),
    //         }
    //     })
    //     .then((res: any) => {
    //         console.log(res.data);
    //         setUser(res.data.user);
    //         setLoading(false);
    //     })
    // }, []);

    // useEffect(() => {
    //     axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, { name: 'John Doe' }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': Cookie.get('token') ?? undefined,
    //         }
    //     })
    //     .then((res: any) => {
    //         if(res.data.tokenStatus === true){
    //             if (!res.data.is_admin) {
    //                 window.location.replace("/home");
    //             } 
    //         }
    //     })
    //     .catch((err: any) => {
    //         Cookie.set('token', undefined);
    //         window.location.replace("/login");
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