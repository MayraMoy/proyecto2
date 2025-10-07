import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/products/", {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category: category.trim(),
        stock: parseInt(stock || 0),
      });

      // ✅ Si el backend devuelve el producto recién creado
      if (res.data && res.data.id) {
        setProducts([...products, res.data]);
      } else {
        // En caso de duda, recargar la lista completa
        const response = await axios.get("http://127.0.0.1:8000/products");
        setProducts(response.data);
      }

      // Limpiar campos
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");

      alert("✅ Producto creado correctamente");
    } catch (err) {
      console.error("❌ Error al crear producto:", err);
      alert(
        err.response?.data?.error ||
          "Error al registrar el producto. Verifica los datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Agregar nuevo producto
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="border border-gray-400 rounded-lg p-2"
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border border-gray-400 rounded-lg p-2"
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className="border border-gray-400 rounded-lg p-2"
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="border border-gray-400 rounded-lg p-2"
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <textarea
          className="border border-gray-400 rounded-lg p-2 sm:col-span-2"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="text-center mt-5">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700"
        >
          {loading ? "Guardando..." : "Agregar producto"}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
