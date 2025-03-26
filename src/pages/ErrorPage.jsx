import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
         <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 200"
        className="w-80 h-auto mb-6 text-gray-700"
      >
        <text x="50" y="80" fontSize="50" fontWeight="bold" fill="red">404</text>
        <rect x="120" y="90" width="60" height="70" rx="10" ry="10" fill="#8B4513" stroke="#333" strokeWidth="3" />
        <ellipse cx="150" cy="85" rx="30" ry="10" fill="#D2691E">
          <animate attributeName="cy" values="85;80;85" dur="1.5s" repeatCount="indefinite" />
        </ellipse>
        <line x1="135" y1="160" x2="130" y2="180" stroke="#333" strokeWidth="3" />
        <line x1="165" y1="160" x2="170" y2="180" stroke="#333" strokeWidth="3" />
      </svg>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page not found</h2>
      <p className="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500 font-semibold dark:text-gray-400">
        &copy; {new Date().getFullYear()} - Kohi Coffeé
      </p>
    </div>
  );
};

export default ErrorPage;
