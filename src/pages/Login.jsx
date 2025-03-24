import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import '../styles/SubmitButton.css';
import globalBackground from '../assets/images/globalBackground.gif';
import kohiMenu from "../assets/images/kohiMenu.png";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { form, setForm, login, user } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login();
    setLoading(false);
    setSuccess(true);
    Swal.fire({
      title: "Successfully Logged In!",
      text: `Welcome ${form.name || "User"} (${form.email || "No Email"})!`,
      icon: "success",
      confirmButtonText: "OK"
    });
    setTimeout(() => {
      setSuccess(false);
    }, 3000); 
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-gray-100 relative overflow-hidden">
      <img 
        src={globalBackground} 
        alt="Login Background" 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      <div className="relative w-full max-w-xs sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl z-10">
        <Link to="/" className="flex items-center gap-2 mb-4 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" /> Back
        </Link>
        <img
          src={kohiMenu}
          alt="brand logo"
          className="w-12 h-12 rounded-full object-cover absolute top-4 right-4"
        />

        {success && user ? (
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Login Success, welcome {user.name}</h2>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Sign in to <span className="text-brown-700">𝐊𝐨𝐡𝐢 𝐂offeé ☕︎</span> account</p>
            </div>
            <br />
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1 relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your full name"
                  />
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account?</span>
                <Link to="/register" className="font-medium text-black hover:underline inline-flex items-center">
                  Sign up
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
