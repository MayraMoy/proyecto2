import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/" + id)
      .then(response => {
        const data = response.data;
        setName(data.name || '');
        setDescription(data.description || '');
        setPrice(data.price || '');
        setCategory(data.category || '');
        setStock(data.stock || '');
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar producto:", error);
        alert("Error al cargar producto");
        navigate('/products');
      })
  }, [id, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validaciones básicas
    if (!name.trim() || !price || parseFloat(price) <= 0) {
      alert("Por favor, completa los campos obligatorios correctamente");
      return;
    }

    axios.put("http://127.0.0.1:8000/products/" + id, {
      name: name.trim(),
      description: description.trim() || null,
      price: parseFloat(price),
      category: category.trim() || null,
      stock: parseInt(stock) || 0
    })
      .then(response => {
        alert("Producto actualizado exitosamente");
        navigate('/products')
      })
      .catch(error => {
        console.error("Error al actualizar producto:", error);
        alert("Error al actualizar producto");
      })
  }

  const goBack = () => {
    navigate('/products')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando producto...</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl mx-4">
        <form onSubmit={handleSubmit}>
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Editar Producto</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del producto *
                </label>
                <input
                  className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none'
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio *
                </label>
                <input
                  className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none'
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <input
                  className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none'
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none'
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none resize-none'
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className='bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors'
              >
                ACTUALIZAR
              </button>
              <button
                type="button"
                onClick={goBack}
                className='bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors'
              >
                CANCELAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;