import { useState } from "react";
import { loginUser } from "../services/authService";

function LoginPage({ setUser, onBack }) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await loginUser(loginData);

            localStorage.setItem("codvedaUser", JSON.stringify(result.data));
            setUser(result.data);

            alert("Login successful");
            onBack();
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <button className="back-btn" onClick={onBack}>
                    ← Back to Home
                </button>

                <div className="login-header">
                    <div className="login-icon">C</div>
                    <h1>Admin Login</h1>
                    <p>Login to manage products in the Codveda dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="login-form" autoComplete="off">
                    <input
                        type="email"
                        name="admin_email_field"
                        placeholder="Admin email"
                        value={loginData.email}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                email: e.target.value
                            })
                        }
                        autoComplete="off"
                    />

                    <input
                        type="password"
                        name="admin_password_field"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                password: e.target.value
                            })
                        }
                        autoComplete="new-password"
                    />

                    <button type="submit">Login to Dashboard</button>
                </form>

                <p className="login-note">
                    Only admin users can add, edit, and delete products.
                </p>
            </div>
        </div>
    );
}

export default LoginPage;