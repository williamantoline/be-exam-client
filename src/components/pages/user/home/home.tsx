import Book from "../../../elements/book";
import Header from "../../../elements/header";

interface Props{}

export default function UserHome(props:Props){
    const isBackgroundRed = true;
    return(
        <>
        <Header />
            <main>
                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Atheneum</h1>
                            <p className="lead text-muted">"You want weapons? We’re in a library. Books are the best weapon in the world. This room’s the greatest arsenal we could have. Arm yourself!"</p>
                            <p>
                                <a href="/" className="btn btn-primary my-2">Main call to action</a>
                                <a href="/" className="btn btn-secondary my-2">Secondary action</a>
                            </p>
                        </div>
                    </div>
                </section>

                <div className="py-5 bg-light">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <Book title="Harry Potter and The Chamber of Secrets" author="J.K.Rowling">
                            <div className="btn-group">
                                <div style={{backgroundColor: isBackgroundRed ? '/44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                            </div>
                        </Book>
                        <Book title="Harry Potter and The Sorcerer’s Stone" author="J.K.Rowling">
                        <div className="btn-group">
                                <div style={{backgroundColor: isBackgroundRed ? '/44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                            </div>
                        </Book>
                        <Book title="Harry Potter and The Prisoner of Azkaban" author="J.K.Rowling">
                            <div className="btn-group">
                                <div style={{backgroundColor: isBackgroundRed ? '/44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                            </div>
                        </Book>
                        <Book title="Harry Potter and The Goblet of Fire" author="J.K.Rowling">
                            <div className="btn-group">
                                <div style={{backgroundColor: isBackgroundRed ? '/44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                            </div>
                        </Book>
                        <Book title="Harry Potter and The Order of The  autPhoenix" author="J.K.Rowling">
                            <div className="btn-group">
                                <div style={{backgroundColor: isBackgroundRed ? '/44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                            </div>
                        </Book>
                        <Book title="Harry Potter and The Half-Blood Prince" author="J.K.Rowling">
                            <div className="btn-group">
                                <div style={{backgroundColor: isBackgroundRed ? '/44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                            </div>
                        </Book>
                        </div>
                        

                    </div>
                </div>
            </main></>
    )
}