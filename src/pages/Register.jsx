import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/SubmitButton.css";
import globalBackground from '../assets/images/globalBackground.gif';
import kohiMenu from "../assets/images/kohiMenu.png";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Weak";
    if (password.length === 8) return "Medium";
    if (password.length > 8) return "Strong";
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        title: "Success!",
        text: "Registration successful! Redirecting...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
        navigate("/login");
      });

    } catch (error) {
      console.error("Registration error:", error.response?.data);
      setErrors(error.response?.data || { general: "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <img src={globalBackground} alt="Register Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative max-w-md w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl z-10">
        <Link to="/login" className="flex items-center gap-x-2 mb-4 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" /> Back
        </Link>
        <img src={kohiMenu} alt="Brand Logo" className="w-12 h-12 rounded-full object-cover absolute top-4 right-4" />
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join us and discover premium coffee</p>
        </div>
        <form className="submit" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["firstName", "lastName"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">{field === "firstName" ? "First Name" : "Last Name"}</label>
                <div className="relative">
                  <input
                    name={field}
                    type="text"
                    value={formData[field]}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 pl-10 border rounded-lg focus:ring focus:ring-gray-300"
                    placeholder={field === "firstName" ? "First name" : "Last name"}
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
                {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>
          {["email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field === "email" ? "Email" : field === "password" ? "Password" : "Confirm Password"}
              </label>
              <div className="relative">
                <input
                  name={field}
                  type={
                    field === "password" ? (showPassword ? "text" : "password") :
                    field === "confirmPassword" ? (showConfirmPassword ? "text" : "password") :
                    "text"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 pl-10 border rounded-lg focus:ring focus:ring-gray-300"
                  placeholder={field === "email" ? "Enter your email"
                    : field === "password" ? "Create a password"
                    : "Confirm your password"}
                />
                {field === "email" ? (
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                ) : (
                  <>
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                    <button
                      type="button"
                      onClick={() => field === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
                    >
                      {field === "password"
                        ? showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
                        : showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />
                      }
                    </button>
                  </>
                )}
              </div>
              {field === "password" && formData.password && (
                <p className={`text-sm mt-1 ${
                  passwordStrength === "Strong" ? "text-green-600" :
                  passwordStrength === "Medium" ? "text-yellow-600" :
                  "text-red-600"
                }`}>
                  Password strength: {passwordStrength}
                </p>
              )}
              {field === "confirmPassword" && formData.confirmPassword && (
                <p className={`text-sm mt-1 ${
                  formData.password === formData.confirmPassword ? "text-green-600" : "text-red-600"
                }`}>
                  {formData.password === formData.confirmPassword ? "Passwords match" : "Passwords do not match"}
                </p>
              )}
            </div>
          ))}
          <br />
          <button type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
