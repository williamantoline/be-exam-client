import React, { useState } from "react";

interface Props {
    color?: string,
    categories: string,
    author: string,
    status: boolean,
    children: React.ReactNode,
}

export default function Book(props: Props) {
    const isBackground = props.status ? true : false;
    const [showFullText, setShowFullText] = useState(false);
    
    const toggleFullText = () => {
        setShowFullText(!showFullText);
    };
    
    return(
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="">
                    <div className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Picture</text>
                            </svg>
                            <div className="card-body">
                            { showFullText ?
                                <div style={{ height: "150px", overflow: "auto" }} onClick={toggleFullText}>
                                    <p className="card-text fs-5">{props.children}</p>
                                </div>
                                : 
                                <p 
                                className="card-text fs-5"
                                style={{
                                  width: "auto",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  cursor: "pointer"
                                }}
                                onClick={toggleFullText}
                                >
                                    {props.children}
                                  
                                </p>
                                }
                                <p className="card-text">{props.categories}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div style={{backgroundColor: isBackground ? '#44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}} className="" ></div>
                                    <input type="checkbox" className="ms-2 me-auto" style={{width: "20px", height: "20px"}} size={100} disabled={!isBackground} />
                                    <small className="text-muted">{props.author}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>     
        </div>   
    )
    
}
