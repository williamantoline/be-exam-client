import UserPageContent from "./content";
import Header from "../../../elements/header";
import Sidebar from "../../../elements/sidebar";


interface Props{}

export default function UserHome(props:Props){
    return(
        <>
        {/* <Header />
        <div className="d-flex">
            <Sidebar />
            <UserPageContent />
        </div> */}
        <div className="d-flex">
            <Sidebar />
            <div className="d-table">
                <Header />
                <UserPageContent />
            </div>
        </div>
        </>
    )
}