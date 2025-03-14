import { useState, useContext } from "react";

import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Iniciar sesión
        </button>
      </form>
      <p className="mt-4">
        ¿No tienes cuenta?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Regístrate
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
