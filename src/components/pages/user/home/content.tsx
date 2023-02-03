import Book from "../../../elements/book";
import Quote from "../../../elements/quote";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { css } from "../../../../styles/styles";


const { endpoint } = require("../../../../config");

const Cookie = require("js-cookie");

interface Props{}

export default function UserPageContent(props:Props){
    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState([]);
    React.useEffect(() => {
        axios.post(`${endpoint}/auth/jwtToken`, { name: 'John Doe' }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any)=>{
            if(res.data.tokenStatus !== true){
                window.location.replace("/login");
            }
        })
    }, []);

    const fetchFiles = async () => {
        setIsLoading(true);
        await axios.get(`${endpoint}/api/files`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res: any) => {
            setFiles(res.data.data);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchFiles();
    }, []);


    const [showDiv, setShowDiv] = React.useState(false);
    const handleButtonClick = () => {
        setShowDiv(!showDiv);
    };
    return(
        <main style={{ overflow: 'scroll', height: '100vh', width:'100%' }}>
            <section className="py-5 text-center container">
                <div className="row py-lg-5" style={{}}>
                    <h2>Welcome to Atheneum</h2>
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <Quote />
                    </div>
                </div>
            </section>

            <div className="py-5 bg-light ms-0 me-2 d-block">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{width: "52px", height: "52px", marginLeft: "auto", float: "right", marginRight: 30, backgroundColor:'gray', border: "2px solid gray"}} onClick={handleButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                    </svg>
                </button>
                <div className="container mt-5">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <Book categories="Sci-Fi & Fantasy" author="J.K.Rowling" status={false}>Harry Potter and The Chamber of Secrets</Book>
                    <Book categories="Sci-Fi & Fantasy" author="J.K.Rowling" status={true}>Harry Potter and The Sorcerer’s Stone</Book>
                    <Book categories="Sci-Fi & Fantasy" author="J.K.Rowling" status={true}>Harry Potter and The Prisoner of Azkaban</Book>
                    <Book categories="Sci-Fi & Fantasy" author="J.K.Rowling" status={true}>Harry Potter and The Goblet of Fire</Book>
                    <Book categories="Sci-Fi & Fantasy" author="J.K.Rowling" status={false}>Harry Potter and The Order of Phoenix</Book>
                    <Book categories="Sci-Fi & Fantasy" author="J.K.Rowling" status={true}>Harry Potter and The Half-Blood Prince</Book>
                </div>
                {showDiv && (
                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header d-block">
                            <div className="d-flex">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Book Box</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <input type="text" className={styles.message()} placeholder="Write you appointment & messages here..." />
                        </div>
                        <div className="modal-body">
                        <ul>
                            <li>Title</li>
                            <li>Title</li>
                            <li>Title</li>
                            <li>Title</li>
                            <li>Title</li>
                        </ul>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                </div>
            </div>
        </main>
    )
}

const styles = {
    message: css({
        input: {
            background: "none",
            border: "none",
            width: "90%",
            height: "80%",
            marginLeft: "8px",
            color: "black",
            fontSize: 16,
            borderTopStyle: "none",
            outline: "none",
        },
        marginTop: 10,
        padding: "6px 12px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 42,
        borderRadius: 6,
        backgroundColor: "#ebeced",
        "&:hover": {
            background: "#4E5154",
        },
    })   
}
