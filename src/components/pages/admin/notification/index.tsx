import axios from "axios";
import { useEffect, useState } from "react";
import Flex from "../../../elements/flex";
import Sidebar from "../../../elements/sidebar";
import User from"../../../../models/User";
import Book from"../../../../models/Book";
import Category from"../../../../models/Category";
import Notification from"../../../../models/Notification";

const Cookie = require("js-cookie");

const logo  = require("../../../../assets/logo.png");

interface Props {}


export default function NotificationPage(props: Props) {

    const [loading, setLoading] = useState<Boolean>(true);

    const [user, setUser] = useState<User>();
    const [success, setSuccess] = useState(false);

    
    useEffect(() => {
        axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            if (res.data.is_admin === false) {
                window.location.replace("/");
            }
            setUser(res.data.user);
            setLoading(false);
        })
    }, []);


    const [notifications, setNotifications] = useState<Notification[]>([]);


    useEffect(() => {
        axios.get(`http://127.0.0.1:3013/api/notifications`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            setNotifications(res.data.data);
            console.log(res.data);
        });
    }, [success]);


    useEffect(() => {
        axios.patch(`http://127.0.0.1:3013/api/notifications/read`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
        });
    }, []);


    const handleDelete = async () => {
        await axios.delete(`http://127.0.0.1:3013/api/notifications`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookie.get("token"),
            }
        })
        .then((res: any) => {
            setSuccess(true);
            alert(res.data.message);
        });
    }


    if (user) {
        return (
            <>
            <Flex justify="flex-start">
                <Sidebar active="notifications" user={user} />
                    <div className="mt-5 w-75">
                        <Flex justify="space-between">
                            <h2 className="">Notifications</h2>
                            <button style={{height: 40}} type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#clearModal">Clear Notification</button>
                        </Flex>
                        <div className="mt-5">
                            {
                                notifications.map((notif: Notification) => {
                                    let clsname;
                                    if (notif.type === "danger") {
                                        clsname = "alert alert-danger alert-dismissible fade show w-75 mb-2";
                                    } else {
                                        clsname = "alert alert-success alert-dismissible fade show w-75 mb-2"
                                    }
                                    return (
                                        <div className={clsname} role="alert">
                                            {notif.read_at ? '' : '[NEW] '}
                                            {notif.read_at ? (notif.subject) : (<strong>{notif.subject}</strong>)}
                                            {notif.body}
                                            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
            </Flex>
            <div className="modal fade" id="clearModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Clear Notifications</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure want to clear all notifications?
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{cursor: "pointer"}} className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Clear</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return <></>
}