import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import Person from "./pages/Person";
import MoviesShows from "./pages/MoviesShows";
import Search from "./pages/Search";
import People from "./pages/People";
import Footer from "./components/Footer";

const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                enabled: false,
            },
        },
    });

    enum loginTypes {
        signup = "signup",
        login = "login",
    }

    const [isSigned, setIsSigned] = useState<boolean | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSigned(true);
            } else {
                setIsSigned(false);
            }
        });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="flex flex-col min-h-screen overflow-hidden w-full bg-bgMain">
                    <Navbar />
                    <div className="flex-grow overflow-hidden bg-bgMain">
                        <Routes>
                            {/* NavBar Pages */}
                            <Route path={"/"} element={<Home />} />
                            <Route
                                path={"/movie/popular"}
                                element={<MoviesShows />}
                            />
                            <Route
                                path={"/movie/top-rated"}
                                element={<MoviesShows />}
                            />
                            <Route
                                path={"/tv/popular"}
                                element={<MoviesShows />}
                            />
                            <Route
                                path={"/tv/top-rated"}
                                element={<MoviesShows />}
                            />
                            <Route path={"/people"} element={<People />} />
                            <Route
                                path={"/about"}
                                element={<h1 className="text-white">about</h1>}
                            />

                            {/* Individual pages */}
                            <Route path={"/movie/?"} element={<Movie />} />
                            <Route path={"/tv/?"} element={<Movie />} />
                            <Route path={"/person/?"} element={<Person />} />
                            <Route path={"/search/?"} element={<Search />} />

                            {/* Private (Show only if NOT logged in) */}
                            <Route
                                path={"/login"}
                                element={
                                    isSigned === false ? (
                                        <Login loginType={loginTypes.login} />
                                    ) : (
                                        isSigned === true && <Navigate to="/" />
                                    )
                                }
                            />
                            <Route
                                path={"/signup"}
                                element={
                                    isSigned === false ? (
                                        <SignUp loginType={loginTypes.signup} />
                                    ) : (
                                        isSigned === true && <Navigate to="/" />
                                    )
                                }
                            />
                            {/* Private (Show only if logged in) */}
                            <Route
                                path={"/profile"}
                                element={
                                    isSigned === true ? (
                                        <Profile />
                                    ) : (
                                        isSigned === false && (
                                            <Navigate to="/" />
                                        )
                                    )
                                }
                            />

                            <Route
                                path={"*"}
                                element={<h1>404 Not Found</h1>}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
