import { css } from "../../styles/styles";

interface Props {
    id: string,
    color?: string,
    title: string,
    author: string,
    image: string,
    isAvailable: boolean,
    onClick: (e: any) => void,
}

export default function Book(props: Props) {

    const urlFormat = (a: string) => {
        return a.substring(7, a.length);
    }

    return(
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="">
                    <div className="col">
                        <div className="card shadow-sm">
                            <img src={`http://127.0.0.1:3013/${urlFormat(props.image)}`} alt="" />
                            <div className="card-body">
                                <p className="card-text">{props.title}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        Is Available: 
                                        {
                                            props.isAvailable ?
                                            <div style={{marginLeft: 8, backgroundColor: '#44f205', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                                            :
                                            <div style={{marginLeft: 8, backgroundColor: 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                                        }
                                    </div>
                                    <small className="text-muted">Author: {props.author}</small>
                                </div>
                                <button className="mt-4 btn btn-primary" id={props.id} onClick={props.onClick}  data-bs-toggle="modal" data-bs-target="#bookModal">Borrow</button>
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