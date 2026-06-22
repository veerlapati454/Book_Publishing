import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Username: alphabets only
    if (name === "username") {
      const alphabetOnly = /^[A-Za-z]*$/;
      if (!alphabetOnly.test(value)) return;
    }

    // Full Name: alphabets and spaces only
    if (name === "fullName") {
      const fullNameRegex = /^[A-Za-z\s]*$/;
      if (!fullNameRegex.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Full Name Validation
    if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      setError("Full Name must contain only alphabets.");
      return;
    }

    // Gmail Validation
    if (!gmailRegex.test(formData.email)) {
      setError("Only Gmail addresses are allowed.");
      return;
    }

    // Username Validation
    if (!/^[A-Za-z]+$/.test(formData.username)) {
      setError("Username must contain only alphabets.");
      return;
    }

    // Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Terms Validation
    if (!formData.terms) {
      setError("You must accept Terms & Conditions.");
      return;
    }

    alert("Registration Successful!");

    navigate("/404");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <Link to="/" className="signup-back-btn">
          <HiArrowLeft />
          Back to Home
        </Link>

        <div className="signup-icon">👤</div>

        <h1>Create Account</h1>
        <p>Join our platform today</p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="signup-input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Only alphabets allowed"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="signup-input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Only alphabets allowed"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gmail */}
          <div className="signup-input-group">
            <label>Gmail</label>
            <input
              type="email"
              name="email"
              placeholder="yourmail@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="signup-input-group">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="signup-input-group">
            <label>Confirm Password</label>

            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="terms-box">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />

            <label htmlFor="terms">
              I agree to the Terms & Conditions
            </label>
          </div>

          {error && <p className="signup-error">{error}</p>}

          <button type="submit" className="signup-btn">
            Register
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          {/* Social Logins */}
          <div className="social-buttons">
            <Link to="/404" className="social-btn google">
              <FaGoogle />
              Google
            </Link>

            <Link to="/404" className="social-btn facebook">
              <FaFacebookF />
              Facebook
            </Link>

            <Link to="/404" className="social-btn github">
              <FaGithub />
              GitHub
            </Link>
          </div>

          <p className="login-link">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;