import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import "../styles/global.scss";
import {useContext} from "react";
import {AuthContext} from "./context/authContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  const {currentUser} = useContext(AuthContext);


  const Layout = () => {
    return (
          <div>
            <Navbar/>
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