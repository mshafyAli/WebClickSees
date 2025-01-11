import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AcdemiansComAu from "./Pages/AcdemiansComAu";
import TheAcademiansCom from "./Pages/TheAcademiansCom";
import APW from "./Pages/APW";
import BPW from "./Pages/BPW";
import { ToastContainer } from "react-toastify";
import Login from "./Components/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/academians.com.au" element={<AcdemiansComAu />} />
        <Route path="/the-academians.com" element={<TheAcademiansCom />} />
        <Route path="/aussiephdwriter.com.au" element={<APW />} />
        <Route path="/britishphdwriters.co.uk" element={<BPW />} />
        <Route path="/login" element={<Login />} />

       
      </Routes>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </>
  );
}

export default App;
