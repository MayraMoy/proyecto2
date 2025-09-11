// components/product/EditProduct
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/product/" + id)
      .then(response => {
        const data = response.data;
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description); // Corregido: era setDescription
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://127.0.0.1:8000/product/" + id, {
      name,
      price,
      description,
    })
      .then(response => {
        // Removido setData que no existe
        navigate('/');
      })
      .catch(error => console.log(error)); // Agregado manejo de errores
  };

  const goHome = (e) => {
    e.preventDefault(); // Prevenir submit del formulario
    navigate('/products'); // Volver a la lista de productos
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center items-center bg-slate-100 p-10 mt-10 rounded-md'>
          <input
            className='my-2 px-5 py-1 rounded-full border border-gray-600'
            type="text" 
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className='my-2 px-5 py-1 rounded-full border border-gray-600'
            type="number" 
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            className='my-2 px-5 py-1 rounded-full border border-gray-600'
            type="text" 
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex my-2">
            <button
              type="submit"
              className='text-white mx-1 px-5 py-1 rounded-full bg-blue-500 hover:bg-blue-700'>
              EDIT
            </button>
            <button
              type="button"
              onClick={goHome}
              className='text-white mx-1 px-5 py-1 rounded-full bg-blue-500 hover:bg-blue-700'
            >
              CANCEL
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;