import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router";
import io from "socket.io-client";
const socket = io('http://127.0.0.1:3013');
function App() {
  return (
    <>
      <Router />
      <ToastContainer autoClose={500} />
    </>
  );
}

export default App;
