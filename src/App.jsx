import { LeftBar } from "./components/leftbar/LeftBar";
import { Navbar } from "./components/navbar/NavBar";
import { RightBar } from "./components/rightbar/RightBar";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login"
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register"
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";


const Layout = () => {
  return (
    <>
    <Navbar />
    <div style={{display:'flex'}}>
      <LeftBar />
      <Outlet />
      <RightBar />
    </div>
    </>
  )
}
const ProtectedURL = ({ children, currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const currentUser = true;

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
