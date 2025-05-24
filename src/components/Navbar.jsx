import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                alert("You logged out successfully");
                navigate("/");
            })
            .catch(() => {
                alert("Error logging out. Please try again.");
            });
    };

    const navLinkStyle = ({ isActive }) =>
        isActive ? "text-green-600 font-semibold " : "text-gray-600";

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <div className="navbar bg-base-100 shadow-sm px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
                        <li><NavLink to="/allRecipes" className={navLinkStyle}>All Recipes</NavLink></li>
                        <li><NavLink to="/addRecipe" className={navLinkStyle}>Add Recipe</NavLink></li>
                        <li><NavLink to="/myRecipes" className={navLinkStyle}>My Recipes</NavLink></li>
                    </ul>
                </div>
                <div className="flex items-center">
                
                    <span className="font-bold text-3xl ml-2 text-green-700">Recipe book</span>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
                    <li><NavLink to="/allRecipes" className={navLinkStyle}>All Recipes</NavLink></li>
                    <li><NavLink to="/addRecipe" className={navLinkStyle}>Add Recipe</NavLink></li>
                    <li><NavLink to="/myRecipes" className={navLinkStyle}>My Recipes</NavLink></li>
                    <li><NavLink to="/contactUs" className={navLinkStyle}>Contact Us</NavLink></li>
                </ul>
            </div>

            <div className="navbar-end gap-5 items-center">
                {/* 🌗 Theme Toggle */}
                <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    checked={isDark}
                    onChange={() => setIsDark(!isDark)}
                />

                {!user ? (
                    <>
                        <NavLink to="/auth/register" className="btn bg-green-800 rounded-2xl text-white px-7">
                            Register
                        </NavLink>
                        <NavLink to="/auth/login" className="btn bg-green-800 rounded-2xl text-white px-7">
                            Login
                        </NavLink>
                    </>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost">
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt="User Profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-60"
                        >
                            <li>
                                <span className="text-sm font-semibold">
                                    {user.displayName || "User"}
                                </span>
                            </li>
                            <li>
                                <span className="text-xs text-gray-500">{user.email}</span>
                            </li>
                            <li>
                                <button onClick={handleSignOut} className="text-green-800 mt-2">
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;