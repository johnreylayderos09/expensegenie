// src/pages/Signup.jsx
import{
React, useState, Link, supabase
} from "../imports";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const canSubmit = acceptedTerms && passwordsMatch && password.length > 0 && email.length > 0 && fullName.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Success! Please check your email to confirm your account.");
      // Optionally, redirect to login page or clear form here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Create Your ExpenseGenie Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Password match error */}
          {!passwordsMatch && confirmPassword.length > 0 && (
            <p className="text-sm text-red-600">Passwords do not match.</p>
          )}

          {/* Terms and Conditions */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              className="mt-1"
              required
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={!canSubmit || loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
            <Link to="/login">
            </Link>
          </button>
        </form>

        {/* Already have account */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>

        {/* Social Signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-3">Or sign up with</p>
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

function PasswordInput({ label, placeholder, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative flex items-center">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onMouseDown={() => setShow(true)}
          onMouseUp={() => setShow(false)}
          onMouseLeave={() => setShow(false)}
          onTouchStart={() => setShow(true)}
          onTouchEnd={() => setShow(false)}
          className="absolute right-3 text-gray-500 hover:text-gray-700 h-full flex items-center"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
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
