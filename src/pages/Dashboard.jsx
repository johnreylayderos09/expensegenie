// src/pages/Dashboard.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? "shadow-md bg-amber-100 text-amber-700"
        : "hover:shadow-md hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Navbar */}
      <header className="bg-blue-50 shadow px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 font-bold text-lg text-gray-800">
            <img
              src="/src/assets/icon.png"
              alt="Genie Logo"
              className="w-10 h-10 rounded-full"
            />
            <span>Expense Genie</span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex gap-10 text-gray-800 font-semibold">
            <NavLink to="/homepage" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

            {/* Hamburger Menu (Mobile) */}
            <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
            onClick={() => setIsOpen(!isOpen)}
            >
            <span
                className={`absolute h-1 w-8 bg-gray-800 rounded transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                }`}
            ></span>
            <span
                className={`absolute h-1 w-8 bg-gray-800 rounded transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
                }`}
            ></span>
            <span
                className={`absolute h-1 w-8 bg-gray-800 rounded transition-transform duration-300 ${
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                }`}
            ></span>
            </button>

        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="flex justify-center mt-3">
            <div className="flex flex-col space-y-2 md:hidden font-semibold text-gray-800 text-center">
              <NavLink to="/homepage" onClick={() => setIsOpen(false)} className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/contact" onClick={() => setIsOpen(false)} className={navLinkClass}>
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <h1 className="text-4xl font-bold text-amber-800 mb-2">
          Welcome to Your Dashboard 🧞‍♂️
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Track your spending, set goals, and make smart money moves.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <NavLink
            to="/add-expense"
            className="bg-[#F1C40F] hover:bg-[#f3d250] text-white font-semibold py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg"
          >
            ➕ Add Expense
          </NavLink>

          <NavLink
            to="/summary"
            className="bg-[#3498DB] hover:bg-[#5dade2] text-white font-semibold py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg"
          >
            📊 View Summary
          </NavLink>

          <NavLink
            to="/goals"
            className="bg-[#2ECC71] hover:bg-[#58d68d] text-white font-semibold py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg"
          >
            🎯 Set Goals
          </NavLink>
        </div>
      </main>
    </div>
  );
}
