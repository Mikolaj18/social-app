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
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import FriendRequests from "./pages/FriendRequests/FriendRequests.jsx";
import Friends from "./pages/Friends/Friends.jsx";
import SearchedUsers from "./pages/SearchedUsers/SearchedUsers.jsx";

function App() {
    const {currentUser} = useContext(AuthContext);
    const {darkMode} = useContext(DarkModeContext);
    const queryClient = new QueryClient()

    const Layout = ({rightMenuVisible = true}) => {
        return (
            <div className={`theme theme--${darkMode ? "dark" : "light"}`}>
                <QueryClientProvider client={queryClient}>
                    <Navbar/>
                    <div className="main">
                        <LeftMenu/>
                        <div style={{flex: 7, width: "100%"}}>
                            <Outlet/>
                        </div>
                        {rightMenuVisible &&
                            <RightMenu/>
                        }
                    </div>
                </QueryClientProvider>
            </div>
        );
    };

    const ProtectedRoute = ({children}) => {
        if (!currentUser) {
            return <Navigate to="/login"/>;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout/>
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
            ],
        },
        {
            element: (
                <ProtectedRoute>
                    <Layout rightMenuVisible={false}/>
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/profile/:id",
                    element: <UserProfile/>,
                },
                {
                    path: "/friends/requests",
                    element: <FriendRequests/>,
                },
                {
                    path: "/friends/:id",
                    element: <Friends/>,
                },
                {
                    path: "/search",
                    element: <SearchedUsers/>,
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
            <RouterProvider router={router}/>
        </>
    );
}

export default App;