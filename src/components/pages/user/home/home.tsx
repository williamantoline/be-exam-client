import UserPageContent from "./content";
import Header from "../../../elements/header";
import { useEffect, useState } from "react";
import axios from "axios";
import Book from "../../../../models/Book";
import User from "../../../../models/User";
const Cookie = require("js-cookie");


interface Props{}

export default function UserHome(props: Props){
    
    const [loading, setLoading] = useState<Boolean>(true);
    const [user, setUser] = useState<User>();
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            if (res.data.tokenStatus === false) {
                window.location.replace("/login");
            }
            setUser(res.data.user);
            setLoading(false);
        })
        .catch((err: any) => {
        })
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/books`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setBooks(res.data.data);
            setLoading(false);
        })
    }, []);


    if (user) {
        return (
            <>
            <div className="d-flex w-100">
                <div className="d-table w-100">
                    <Header user={user} />
                    <UserPageContent />
                </div>
            </div>
            </>
        )
    }
    return <></>
}