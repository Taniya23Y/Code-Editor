import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useMemo } from "react";
import Home from "./pages/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import NotFound from "./pages/NotFound";
import Footer from "./components/commons/Footer";
import Navbar from "./components/commons/Navbar/Navbar";
import About from "./pages/About";
import Editor from "./pages/Editor";
import LivePreview from "./pages/LivePreview";
import DeveloperSnippet from "./pages/DeveloperSnippet";
import VerifyEmail from "./components/Auth/VerifyEmail";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UserProfile from "./components/Auth/UserProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useRefreshTokenQuery } from "./redux/features/auth/authApi";

function App() {
  const location = useLocation();
  const pathname = location.pathname;

  const hideNavFooter = useMemo(() => {
    return ["/login", "/forgot-password", "/signup", "/verify-email"].includes(
      pathname
    );
  }, [pathname]);

  const hideFooter = useMemo(() => {
    return [
      "/login",
      "/forgot-password",
      "/signup",
      "/verify-email",
      "/live-preview",
      "/editor",
    ].includes(pathname);
  }, [pathname]);

  useRefreshTokenQuery();

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/live-preview/:urlId?" element={<LivePreview />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/developer-snippet" element={<DeveloperSnippet />} />

        {/* User Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* {!hideNavFooter && <Footer />} */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
