import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import '../styles/SubmitButton.css';
import ImgBackground from '../assets/images/formBackground.gif';
import kohiMenu from "../assets/images/kohiMenu.png";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { text: "", color: "" };
    if (password.length < 6) return { text: "Weak", color: "red" };
    if (password.length <= 10) return { text: "Medium", color: "orange" };
    return { text: "Strong", color: "green" };
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    setTimeout(() => {
      setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
      alert("Registration successful! Redirecting...");
    }, 1000);
  };

  const { text: strengthText, color: strengthColor } = getPasswordStrength(formData.password);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <img 
        src={ImgBackground} 
        alt="Login Background" 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      <div
        className="relative max-w-md w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl z-10">
        <Link to="/login" className="flex items-center gap-x-2 mb-4 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" /> Back
        </Link>
        <img
          src={kohiMenu}
          alt="brand logo"
          className="w-12 h-12 rounded-full object-cover absolute top-4 right-4"
        />
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join us and discover premium coffee</p>
        </div>
        <br />
        <form className="submit" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['firstName', 'lastName'].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700">{field === 'firstName' ? 'First Name' : 'Last Name'}</label>
                <div className="relative">
                  <input
                    name={field}
                    type="text"
                    value={formData[field]}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 pl-10 border rounded-lg focus:ring focus:ring-gray-300"
                    placeholder={field === 'firstName' ? 'First name' : 'Last name'}
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
                {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>

          {['email', 'password', 'confirmPassword'].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">{field === 'email' ? 'Email' : field === 'password' ? 'Password' : 'Confirm Password'}</label>
              <div className="relative">
                <input
                  name={field}
                  type={field.includes('password') ? 'password' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 pl-10 border rounded-lg focus:ring focus:ring-gray-300"
                  placeholder={field === 'email' ? 'Enter your email' : field === 'password' ? 'Create a password' : 'Confirm your password'}
                />
                {field === 'email' ? <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" /> : <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />}
              </div>
              {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field]}</p>}
              {field === 'password' && <p style={{ color: strengthColor }} className="text-sm mt-1 font-extrabold">{strengthText}</p>}
            </div>
          ))}
          <br />
          <button type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">Create Account</button>
        </form>
      </div>
    </div>
  );
}