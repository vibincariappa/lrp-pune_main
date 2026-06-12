import {
 BrowserRouter,
 Routes,
 Route
}
from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/admin/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import PillarPage from "../pages/pillars/PillarPage";

export default function AppRoutes(){

 return(

  <BrowserRouter>

   <Routes>

    <Route
     path="/"
     element={<HomePage />}
    />

    <Route
     path="/login"
     element={<LoginPage />}
    />

    <Route
     path="/dashboard"
     element={<DashboardPage />}
    />

    <Route
     path="/pillars/:id"
     element={<PillarPage />}
    />

   </Routes>

  </BrowserRouter>

 );

}