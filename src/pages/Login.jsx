import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; 


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/homepage")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Login to ExpenseGenie
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />

          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>

        {/* Social Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-3">Or login with</p>
          <div className="flex justify-center gap-4">
            <SocialButton img="/src/assets/google-logo.svg" label="Google" />
            <SocialButton img="/src/assets/facebook-logo.svg" label="Facebook" />
            <SocialButton img="/src/assets/phone-logo.svg" label="Phone" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordInput({ label, placeholder, value, onChange, show, onToggle }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative flex items-center">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 text-gray-500 hover:text-gray-700 h-full flex items-center"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            // Eye open icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            // Eye closed icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.944-9.542-7a9.97 9.97 0 012.223-3.578m2.338-1.955a3 3 0 014.243 4.243m3.145 3.145a9.969 9.969 0 004.243-4.243M3 3l18 18"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function SocialButton({ img, icon, label }) {
  return (
    <button className="bg-white border px-4 py-2 rounded shadow hover:bg-gray-100 flex items-center gap-2">
      {img && <img src={img} alt={label} className="h-5 w-5" />}
      {icon && (
        <svg
          className="h-5 w-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M3 10h4l3-8v18l-3-8H3z" />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
}
