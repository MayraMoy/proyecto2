import axios from "axios";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import AddUser from "./AddUser";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 Cargando usuarios...");
    setLoading(true);
    
    axios.get("http://127.0.0.1:8000/users")
      .then(response => {
        console.log("✅ Usuarios recibidos:", response.data);
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("❌ Error al cargar usuarios:", error);
        setLoading(false);
      })
  }, [])

  const deleteUser = (id) => {
    console.log("🗑️ Eliminando usuario:", id);
    axios.delete(`http://127.0.0.1:8000/users/${id}`)
      .then((response) => {
        const newUser = users.filter((user) => user.id !== id);
        console.log("✅ Usuario eliminado, usuarios restantes:", newUser);
        setUsers(newUser);
      })
      .catch(error => {
        console.error("❌ Error al eliminar usuario:", error);
        alert("Error al eliminar usuario");
      });
  }

  console.log("🎯 Estado actual - usuarios:", users, "loading:", loading);

  return (
    <div className="max-w-xl pb-8 mx-auto px-5 bg-slate-100">
      <h1 className="text-2xl font-bold text-center py-5">Gestión de Usuarios</h1>
      
      <UserList
        users={users}
        loading={loading}
        deleteUser={deleteUser}
      />
      <AddUser
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default Home;
