import React from "react";
import axios from "axios";

const ProductList = ({ products, setProducts }) => {
  // 🗑️ Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      alert("🗑️ Producto eliminado correctamente");
    } catch (err) {
      console.error("❌ Error al eliminar producto:", err);
      alert("Error al eliminar producto.");
    }
  };

  // ✏️ Editar producto
  const handleEdit = async (id) => {
    const newName = prompt("Nuevo nombre del producto:");
    const newPrice = prompt("Nuevo precio:");
    if (!newName || !newPrice) return;

    try {
      const res = await axios.put(`http://127.0.0.1:8000/products/${id}`, {
        name: newName,
        price: parseFloat(newPrice),
      });

      // Actualizar la lista local
      setProducts(products.map((p) => (p.id === id ? res.data : p)));
      alert("✅ Producto actualizado correctamente");
    } catch (err) {
      console.error("❌ Error al editar producto:", err);
      alert("Error al editar producto.");
    }
  };

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 mt-5">No hay productos disponibles.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">Lista de productos</h2>
      <ul className="divide-y divide-gray-300 bg-white rounded-lg shadow">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center p-3 hover:bg-gray-100 transition"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">
                {p.category ? `${p.category} · ` : ""}${p.stock} unidades
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-semibold">${p.price}</span>
              <button
                onClick={() => handleEdit(p.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
