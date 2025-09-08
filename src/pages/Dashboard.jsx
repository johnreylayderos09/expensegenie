import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../imports"; // Make sure supabase is correctly imported here

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState(null);

useEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session?.user) {
        setUserId(session.user.id);

        // Insert user into 'users' table if not exists
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (!existingUser && !fetchError) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              id: session.user.id,
              email: session.user.email,
            },
          ]);
          if (insertError) {
            console.error("Error inserting user:", insertError.message);
          }
        }
      } else {
        setUserId(null);
      }
    }
  );
  return () => {
    authListener?.subscription?.unsubscribe();
  };
}, []);


  const [formData, setFormData] = useState({
    food: "",
    clothing: "",
    education: "",
    housing: "",
    personal_needs: "",
    healthcare: "",
    leisure: "",
    transportation: "",
    bills: "",
    others: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated.");
      return;
    }

    const cleanedData = {};
    Object.keys(formData).forEach((key) => {
      const val = parseFloat(formData[key]);
      cleanedData[key] = isNaN(val) ? 0 : val;
    });

    const { error } = await supabase.from("expense").insert([
      {
        ...cleanedData,
        user_id: userId,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      alert("Error adding expense: " + error.message);
    } else {
      alert("Expense added successfully!");
      setFormData({
        food: "",
        clothing: "",
        education: "",
        housing: "",
        personal_needs: "",
        healthcare: "",
        leisure: "",
        transportation: "",
        bills: "",
        others: "",
      });
      setShowForm(false);
    }
  };

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
            aria-label="Toggle Menu"
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
              <NavLink
                to="/homepage"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-start flex-grow px-4 text-center py-6">
        {/* Welcome Message */}
        <h1 className="text-4xl font-bold text-amber-800 mb-2">
          Welcome to Your Dashboard 🧞‍♂️
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Track your spending, set goals, and make smart money moves.
        </p>

        {/* Show form only if toggled */}
        {showForm && (
          <div className="w-full max-w-4xl mb-8">
            <form
              onSubmit={handleFormSubmit}
              className="bg-white shadow-md rounded-lg p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-gray-700 font-semibold capitalize">
                      {key.replace("_", " ")}
                    </label>
                    <input
                      type="text"
                      value={formatNumberWithCommas(formData[key])}
                      placeholder={`Enter your ${key.replace("_", " ")} expenses`}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, "");
                        if (/^\d*\.?\d*$/.test(rawValue)) {
                          setFormData({
                            ...formData,
                            [key]: rawValue,
                          });
                        }
                      }}
                      className="text-center mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded mt-4 w-full"
              >
                Submit Expense
              </button>
            </form>
          </div>
        )}

        {/* Grid buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#F1C40F] hover:bg-[#f3d250] text-white font-semibold py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg"
          >
            {showForm ? "➖ Close Expense Form" : "➕ Add Expense"}
          </button>

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

function formatNumberWithCommas(value) {
  if (!value) return "";
  const cleanValue = value.toString().replace(/[^\d.]/g, "");
  const parts = cleanValue.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
