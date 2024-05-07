import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Registrer";
import BedriftSokPage from "./pages/BedriftSok";
import Company from "./pages/Company";

const Router = () => {
  return (
    <BrowserRouter basename="/project2">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/sok-bedrifter/:bedrift" element={<Company />} />
        <Route path="/logg-inn" element={<Login />} />
        <Route path="/registrer" element={<Register />} />
        <Route path="/sok-bedrifter" element={<BedriftSokPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
