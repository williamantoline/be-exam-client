import { css } from "../../styles/styles";

interface Props {
    children: React.ReactNode,
    color?: string,
    title: string,
}

export default function Book(props: Props) {
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
                                <p className="card-text">{props.title}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    {props.children}
                                    
                                    <small className="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>     
        </div>   
    )
    
}

const styles = {
    
}