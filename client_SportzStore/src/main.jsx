import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import AllEquipment from "./pages/AllEquipment.jsx";
import AddEquipments from "./pages/AddEquipments.jsx";
import MyEquipment from "./pages/MyEquipment.jsx";
import ViewDetails from "./pages/ViewDetails.jsx";
import UpdateDetails from "./pages/UpdateDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/allequipment" element={<AllEquipment />} />
        <Route path="/addequipment" element={<AddEquipments />} />
        <Route path="/myequipment" element={<MyEquipment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/details/:id" element={<ViewDetails />} />
        <Route path="/update/:id" element={<UpdateDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
