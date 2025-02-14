import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import '../styles/SubmitButton.css';
import globalBackground from '../assets/images/globalBackground.gif';
import kohiMenu from "../assets/images/kohiMenu.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
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
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to <strong className="text-brown-700">𝐊𝐨𝐡𝐢 𝐂offeé ☕︎</strong> account</p>
        </div>
        <br />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
              />
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input id="remember-me" type="checkbox" className="h-4 w-4 text-black border-gray-300 rounded" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-black hover:underline">Forgot your password?</a>
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Sign in
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>
            <Link to="/register" className="font-medium text-black hover:underline inline-flex items-center">
              Sign up
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
