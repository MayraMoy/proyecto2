import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditProveedor = () => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/proveedores/" + id)
      .then((response) => {
        const data = response.data;
        setNombre(data.nombre);
        setDireccion(data.direccion);
        setTelefono(data.telefono);
        setEmail(data.email);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/proveedores/" + id, {
        nombre,
        direccion,
        telefono,
        email,
      })
      .then(() => {
        navigate("/"); // Redirige al home o lista de proveedores
      })
      .catch((error) => console.error("Error al actualizar proveedor:", error));
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center bg-slate-100 p-10 mt-10 rounded-md">
          <input
            className="my-2 px-5 py-1 rounded-full border border-gray-600"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="my-2 px-5 py-1 rounded-full border border-gray-600"
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <input
            className="my-2 px-5 py-1 rounded-full border border-gray-600"
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <input
            className="my-2 px-5 py-1 rounded-full border border-gray-600"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex my-2">
            <button
              type="submit"
              className="text-white mx-1 px-5 py-1 rounded-full bg-blue-500 hover:bg-blue-700"
            >
              EDITAR
            </button>
            <button
              type="button"
              onClick={goHome}
              className="text-white mx-1 px-5 py-1 rounded-full bg-gray-500 hover:bg-gray-700"
            >
              CANCELAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProveedor;
