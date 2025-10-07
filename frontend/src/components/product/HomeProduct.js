import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error al cargar productos:", err));
  }, []);

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

  const handleEdit = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newName = prompt("Nuevo nombre del producto:", product.name);
    if (!newName) return;

    const newPrice = prompt("Nuevo precio:", product.price);
    if (!newPrice) return;

    const newCategory = prompt("Nueva categoría:", product.category || "");
    const newStock = prompt("Nuevo stock:", product.stock || 0);
    const newDescription = prompt("Nueva descripción:", product.description || "");

    try {
      const res = await axios.put(`http://127.0.0.1:8000/products/${id}`, {
        name: newName.trim(),
        price: parseFloat(newPrice),
        category: newCategory.trim() || null,
        stock: parseInt(newStock) || 0,
        description: newDescription.trim() || null
      });

      setProducts(products.map((p) => (p.id === id ? res.data : p)));
      alert("✅ Producto actualizado correctamente");
    } catch (err) {
      console.error("❌ Error al editar producto:", err);
      alert("Error al editar producto.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-100 p-5 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Gestión de Productos</h1>
      
      <AddProduct products={products} setProducts={setProducts} />
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No hay productos disponibles.</p>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Lista de productos</h2>
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {p.name}
                    </h3>
                    
                    {p.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {p.description}
                      </p>
                    )}
                    
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      {p.category && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          📁 {p.category}
                        </span>
                      )}
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        📦 Stock: {p.stock}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <span className="text-xl font-bold text-green-600">
                      ${p.price}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeProducts;