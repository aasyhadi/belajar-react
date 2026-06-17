import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("123123");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Login gagal. Periksa email dan password.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default LoginPage;