


import Header from "./components/Header";
import DynamicHomePage from "./pages/DynamicHomePage";
import LoginPage from "./pages/LoginPage";

import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
//import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <Header />
   
      <ToastContainer />
      <Routes>
        <Route path="/" element={<DynamicHomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="signin" element={<LoginPage />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}

export default App;
// Redirect
//<Route path="/" element={<DynamicHomePage />} />