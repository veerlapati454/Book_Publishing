import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import Books from "./components/Books/Books";
import Authors from "./components/Authors/Authors";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import NotFound from "./components/NotFound/NotFound";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;