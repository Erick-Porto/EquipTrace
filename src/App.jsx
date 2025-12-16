import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TrackerProvider } from "./context/TrackerContext";

import MainLayout from "./layouts/MainLayout";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Monitor from "./Monitor";
import EditTracker from "./EditTracker";
import ManageAssetTypes from "./ManageAssetTypes";
import ManageUsers from "./ManageUsers";
import ManageHardware from "./ManageHardware";
import ManageAssets from "./ManageAssets";
import ManageRoles from "./ManageRoles";
function App() {
  return (
    <TrackerProvider>
      <Router>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas Privadas */}
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/monitor/:id"
            element={
              <MainLayout>
                <Monitor />
              </MainLayout>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <MainLayout>
                <EditTracker />
              </MainLayout>
            }
          />
          <Route
            path="/manage-types"
            element={
              <MainLayout>
                <ManageAssetTypes />
              </MainLayout>
            }
          />
          <Route
            path="/manage-users"
            element={
              <MainLayout>
                <ManageUsers />
              </MainLayout>
            }
          />
          <Route
            path="/manage-hardware"
            element={
              <MainLayout>
                <ManageHardware />
              </MainLayout>
            }
          />
          <Route
            path="/manage-assets"
            element={
              <MainLayout>
                <ManageAssets />
              </MainLayout>
            }
          />
          <Route
            path="/manage-roles"
            element={
              <MainLayout>
                <ManageRoles />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </TrackerProvider>
  );
}

export default App;
