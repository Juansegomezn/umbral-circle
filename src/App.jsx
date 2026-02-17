import { useContext } from "react";
import { LeftBar } from "./components/leftbar/LeftBar";
import { Navbar } from "./components/navbar/NavBar";
import { RightBar } from "./components/rightbar/RightBar";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login"
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register"
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";


const Layout = () => {
  const {darkMode} = useContext(DarkModeContext);  
  
  return (
    <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <div style={{display:'flex'}}>
        <LeftBar />
        <div style={{flex:6}}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  )
}
const ProtectedURL = ({ children, currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const currentUser = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
      <ProtectedURL currentUser={currentUser}>
        <Layout />
      </ProtectedURL>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
