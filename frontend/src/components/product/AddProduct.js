import React, { useState } from 'react';
import axios from "axios";

const AddProduct = ({ setProducts, products }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validaciones básicas
		if (!name.trim() || !price || parseFloat(price) <= 0) {
			alert("Por favor, completa los campos obligatorios correctamente");
			return;
		}

		axios
			.post("http://127.0.0.1:8000/products", {
				name: name.trim(),
				description: description.trim() || null,
				price: parseFloat(price),
				category: category.trim() || null,
				stock: parseInt(stock) || 0
			})
			.then((res) => {
				const nuevoProducto = res.data;
				setProducts([...products, nuevoProducto]);
				
				// Limpiar formulario
				setName('');
				setDescription('');
				setPrice('');
				setCategory('');
				setStock('');
			})
			.catch((err) => {
				console.error("Error al crear producto:", err);
				alert("Error al registrar producto");
			});
	};

	return (
		<div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">Agregar Nuevo Producto</h2>
			<form onSubmit={handleSubmit}>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<input
							className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							type="text"
							placeholder="Nombre del producto *"
						/>
					</div>
					<div>
						<input
							className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
							type="number"
							step="0.01"
							min="0"
							placeholder="Precio *"
						/>
					</div>
					<div>
						<input
							className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							type="text"
							placeholder="Categoría"
						/>
					</div>
					<div>
						<input
							className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none'
							value={stock}
							onChange={(e) => setStock(e.target.value)}
							type="number"
							min="0"
							placeholder="Stock disponible"
						/>
					</div>
					<div className="md:col-span-2">
						<textarea
							className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none resize-none'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows="3"
							placeholder="Descripción del producto"
						/>
					</div>
				</div>
				<div className='mt-4 text-center'>
					<button 
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
					>
						Agregar Producto
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddProduct;