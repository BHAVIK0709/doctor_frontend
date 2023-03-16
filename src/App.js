import { Route,Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectRoute from "./components/ProtectRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/Doctor/Profile";
import BookingPage from "./pages/BookingPage";

function App() {
 const {loading} =  useSelector((state)=>state.alertReducer)
 console.log(loading)
  return (
    <>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectRoute>
                  <HomePage />
                </ProtectRoute>
              }
            />
              <Route
              path="/apply-doctor"
              element={
                <ProtectRoute>
                  <ApplyDoctor />
                </ProtectRoute>
              }
            />
             <Route
              path="/admin/users"
              element={
                <ProtectRoute>
                  <Users />
                </ProtectRoute>
              }
            />
             <Route
              path="/admin/doctors"
              element={
                <ProtectRoute>
                  <Doctors />
                </ProtectRoute>
              }
            />
              <Route
              path="/doctor/profile/:id"
              element={
                <ProtectRoute>
                  <Profile />
                </ProtectRoute>
              }
            />
             <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectRoute>
                  <BookingPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectRoute>
                  <Notification />
                </ProtectRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        )}
     
    </>
  );
}

export default App;
