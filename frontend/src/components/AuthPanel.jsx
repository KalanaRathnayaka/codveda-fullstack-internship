import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";

function AuthPanel({ user, setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;

      if (isRegister) {
        result = await registerUser(formData);
        alert("Registration successful");
      } else {
        result = await loginUser({
          email: formData.email,
          password: formData.password
        });
        alert("Login successful");
      }

      localStorage.setItem("codvedaUser", JSON.stringify(result.data));
      setUser(result.data);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user"
      });
    } catch (error) {
      alert(error.response?.data?.message || "Authentication failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("codvedaUser");
    setUser(null);
    alert("Logged out successfully");
  };

  if (user) {
    return (
      <div className="auth-box">
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>
            Logged in as <strong>{user.role}</strong>
          </p>
          {user.role === "admin" ? (
            <span className="admin-badge">Admin Access Enabled</span>
          ) : (
            <span className="user-badge">View Only User</span>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="auth-box">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Create Account" : "Login"}</h2>

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {isRegister && (
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button type="submit">{isRegister ? "Register" : "Login"}</button>

        <p className="switch-text">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? " Login" : " Register"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthPanel;