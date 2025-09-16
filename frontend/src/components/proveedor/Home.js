import axios from "axios";
import { useEffect, useState } from "react";
import ProveedorList from './UserProveedor'; // deberías renombrar este archivo a ProveedorList.js
import AddProveedor from './AddProveedor';

const Home = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/proveedores")
      .then(response => {
        setProveedores(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar proveedores:", error);
        setLoading(false);
      });
  }, []);

  const deleteProveedor = (id) => {
    axios.delete(`http://127.0.0.1:8000/proveedores/${id}`)
      .then(() => {
        const nuevosProveedores = proveedores.filter((prov) => prov.id !== id);
        setProveedores(nuevosProveedores);
      })
      .catch(error => {
        console.error("Error al eliminar proveedor:", error);
      });
  };

  return (
    <div className="max-w-xl pb-8 mx-auto px-5 bg-slate-100">
      <ProveedorList
        proveedores={proveedores}
        loading={loading}
        deleteProveedor={deleteProveedor}
      />
      <AddProveedor
        proveedores={proveedores}
        setProveedores={setProveedores}
      />
    </div>
  );
};

export default Home;

