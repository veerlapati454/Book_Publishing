import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gmail validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(formData.email)) {
      setError("Only Gmail addresses are allowed.");
      return;
    }

    // Navigate based on role
    if (formData.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Link to="/" className="back-btn">
          <HiArrowLeft />
          Back to Home
        </Link>

        <div className="login-icon">🔒</div>

        <h1>Welcome</h1>
        <p>Login to your account to continue</p>

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Gmail */}
          <div className="input-group">
            <label>Gmail</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="yourmail@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
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

          {error && <p className="login-error">{error}</p>}

          <div className="forgot-password">
            <Link to="/404">Forgot Password?</Link>
          </div>

          <button type="submit" className="login1-btn">
            Login
          </button>
          <p className="signup-link">
            New User?
            <Link to="/signup"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;