import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AcdemiansComUk from "./Pages/AcdemiansCoUk";
import TheAcdemiansCoUk from "./Pages/TheAcdemiansCoUk";
import APW from "./Pages/APW";
import BPW from "./Pages/BPW";
import THA from "./Pages/THA";
import TA from "./Pages/TA";
import { ToastContainer } from "react-toastify";
import Login from "./Components/Login";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice/index.js";
import { useDispatch, useSelector } from "react-redux";
import CheckAuth from "./Components/common/check-auth";
import SignUp from "./Components/SignUp";
function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  console.log(
    "User",
    user,
    "Authentication",
    isAuthenticated,
    "isLoading",
    isLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/academians.co.uk" element={<AcdemiansComUk />} />
        <Route path="/the-academians.co.uk" element={<TheAcdemiansCoUk />} />
        <Route path="/aussiephdwriter.com.au" element={<APW />} />
        <Route path="/britishphdwriters.co.uk" element={<BPW />} />
        <Route path="/the-academians.au" element={<THA />} />
        <Route path="/the-academians.uk" element={<TA />} />
      <Route path="/login" element={<Login />} />

       
      </Routes> */}

      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/academians.co.uk" element={<AcdemiansComUk />} />
          <Route path="/the-academians.co.uk" element={<TheAcdemiansCoUk />} />
          <Route path="/aussiephdwriter.com.au" element={<APW />} />
          <Route path="/britishphdwriters.co.uk" element={<BPW />} />
          <Route path="/the-academians.au" element={<THA />} />
          <Route path="/the-academians.uk" element={<TA />} />

          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Home />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <SignUp /> : <Home />}
          />

          <Route path="/" element={<Home />} />
        </Routes>
      </CheckAuth>
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
