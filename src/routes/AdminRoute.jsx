import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPublicRoutes from "./AdminPublicRoutes";
import AdminLogin from "../pages/admin/login/AdminLogin";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import AdminHome from "../pages/admin/adminHome/AdminHome";
import UserList from "../pages/admin/userList/UserList";
import OrganizerList from "../pages/admin/organizerList/OrganizerList";
import BannerList from "../pages/admin/banner/BannerList";
import EventList from "../pages/admin/eventList/EventList";
import EditBanner from "../pages/admin/banner/EditBanner";

function AdminRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminPublicRoutes>
            <AdminLogin />
          </AdminPublicRoutes>
        }
      />
      <Route
        path="/home"
        element={
          <AdminProtectedRoutes>
            <AdminHome />
          </AdminProtectedRoutes>
        }
      />
      <Route
        path="/user-list"
        element={
          <AdminProtectedRoutes>
            <UserList />
          </AdminProtectedRoutes>
        }
      />
      <Route
        path="/organizer-list"
        element={
          <AdminProtectedRoutes>
            <OrganizerList />
          </AdminProtectedRoutes>
        }
      />
      <Route
        path="/banner-setup"
        element={
          <AdminProtectedRoutes>
            <BannerList />
          </AdminProtectedRoutes>
        }
      />
      <Route
        path="/event-list"
        element={
          <AdminProtectedRoutes>
            <EventList />
          </AdminProtectedRoutes>
        }
      />
      <Route
        path="/edit-banner/:id"
        element={
          <AdminProtectedRoutes>
            <EditBanner />
          </AdminProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default AdminRoute;
