import Book from "../../../elements/book";
import Quote from "../../../elements/quote";
import Button from "../../../elements/button";
interface Props{}

export default function UserPageContent(props:Props){
    const isBackgroundRed = true;
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

            <div className="py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <Book title="Harry Potter and The Chamber of Secrets" author="J.K.Rowling">
                        <div className="btn-group">
                            <div style={{backgroundColor: isBackgroundRed ? '#44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                        </div>
                    </Book>
                    <Book title="Harry Potter and The Sorcerer’s Stone" author="J.K.Rowling">
                    <div className="btn-group">
                            <div style={{backgroundColor: isBackgroundRed ? '#44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                        </div>
                    </Book>
                    <Book title="Harry Potter and The Prisoner of Azkaban" author="J.K.Rowling">
                        <div className="btn-group">
                            <div style={{backgroundColor: isBackgroundRed ? '#44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                        </div>
                    </Book>
                    <Book title="Harry Potter and The Goblet of Fire" author="J.K.Rowling">
                        <div className="btn-group">
                            <div style={{backgroundColor: isBackgroundRed ? '#44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                        </div>
                    </Book>
                    <Book title="Harry Potter and The Order of The  autPhoenix" author="J.K.Rowling">
                        <div className="btn-group">
                            <div style={{backgroundColor: isBackgroundRed ? '#44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                        </div>
                    </Book>
                    <Book title="Harry Potter and The Half-Blood Prince" author="J.K.Rowling">
                        <div className="btn-group">
                            <div style={{backgroundColor: isBackgroundRed ? '#44f205' : 'red', borderRadius: "50%", width: "25px", height: "25px"}}  className="" ></div>
                        </div>
                    </Book>
                    </div>
                    

                </div>
            </div>
        </main>
    )
}