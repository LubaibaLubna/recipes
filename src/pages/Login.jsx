import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.code === "user-not-found") {
          setError("No user found with this email.");
        } else if (error.code === "wrong-password") {
          setError("Incorrect password.");
        } else {
          setError(error.message || "Login failed. Please try again.");
        }
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch(() => {
        setError("Google login failed. Try again.");
      });
  };

  const handleForgotPassword = () => {
    const email = prompt("Enter your registered email to reset your password:");
    if (!email) return;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
      })
      .catch(() => {
        alert("Failed to send reset email. Please try again.");
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center text-green-800">Login to your account</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input input-bordered"
              placeholder="Email"
              required
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-16"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div>
              <button
                onClick={handleForgotPassword}
                type="button"
                className="link link-hover text-sm text-blue-600"
              >
                Forgot password?
              </button>
            </div>

            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}

            <button type="submit" className="btn bg-green-800 text-white mt-4">
              Login
            </button>
          </fieldset>
        </form>

        <div className="px-8">
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-primary w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={24} /> Continue with Google
          </button>

          <p className="font-semibold text-center pt-5">
            Don't Have An Account?{" "}
            <Link className="text-green-800" to="/auth/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
