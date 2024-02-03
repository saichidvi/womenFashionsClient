import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/cart" element={<Cart></Cart>}></Route>
    </Routes>
    <ToastContainer></ToastContainer>
  </Router>
);
export default App;
