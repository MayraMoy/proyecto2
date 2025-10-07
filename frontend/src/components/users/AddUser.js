import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ setUsers, users }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/signup", {
        email: email.trim(),
        password: password.trim(),
      });

      // Si el backend devuelve el usuario creado (ideal)
      if (res.data && res.data.id) {
        const nuevoUsuario = {
          id: res.data.id,
          email: res.data.email,
        };
        setUsers([...users, nuevoUsuario]);
      } else {
        // Si solo devuelve un mensaje, recargamos la lista completa
        const response = await axios.get("http://127.0.0.1:8000/users");
        setUsers(response.data);
      }

      setEmail("");
      setPassword("");
      alert("✅ Usuario registrado correctamente");
    } catch (err) {
      console.error("❌ Error al crear usuario:", err);
      alert(
        err.response?.data?.error ||
          "Error al registrar usuario. Verifica el correo y la conexión."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-evenly">
        <div className="mb-2">
          <input
            className="px-3 py-1 rounded-full border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-2">
          <input
            className="px-3 py-1 rounded-full border border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <div className="mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddUser;

