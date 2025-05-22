import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setError("Password must be at least 6 characters, include uppercase and lowercase letters.");
      return;
    }

    try {
      await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photo });
      setError("");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setError("");
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center mt-5">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="text-2xl font-bold text-center text-green-800">Register</h2>
        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Name</label>
          <input type="text" name="name" className="input input-bordered" required />

          <label className="label">Photo URL</label>
          <input type="text" name="photo" className="input input-bordered" required />

          <label className="label">Email</label>
          <input type="email" name="email" className="input input-bordered" required />

          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full pr-16"
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

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          <button type="submit" className="btn bg-green-800 text-white mt-4">Register</button>
        </form>

        <div className="divider px-8">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline btn-primary w-11/12 mx-auto flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="text-center pt-5">
          Already have an account?{" "}
          <Link className="text-green-800 font-semibold" to="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
