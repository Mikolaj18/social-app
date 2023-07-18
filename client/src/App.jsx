import {
  createBrowserRouter,
  RouterProvider,
  Navigate, Outlet,
} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import "../styles/global.scss";
import {useContext} from "react";
import {AuthContext} from "./context/authContext.jsx";
import {DarkModeContext} from "./context/darkModeContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import LeftMenu from "./components/LeftMenu/LeftMenu.jsx";
import RightMenu from "./components/RightMenu/RightMenu.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  const {currentUser} = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
          <div className={`theme theme--${darkMode ? "dark" : "light"}`}>
            <Navbar/>
            <div style={{display: "flex", marginTop: "30px"}}>
              <LeftMenu/>
              <div style={{flex: 7}}>
                <Outlet/>
              </div>
              <RightMenu/>
            </div>
          </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return (
      <>
        <RouterProvider router={router} />
      </>
  );
}

export default App;