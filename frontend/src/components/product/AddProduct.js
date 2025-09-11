// components/product/AddProduct
import React, { useState } from 'react';
import axios from "axios";

const AddProduct = ({ setProducts, products }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://127.0.0.1:8000/products", {
				name: name,
				price: parseFloat(price),
				description: description
			})
			.then((res) => {
				const nuevoProducto = {
					id: res.data.id,
					name: res.data.name,
					price: res.data.price,
					description: res.data.description
				};

				setProducts([...products, nuevoProducto]);
				setName('');
				setPrice('');
				setDescription('');
			})
			.catch((err) => {
				console.error("Error al crear producto:", err);
				alert("Error al registrar producto");
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-col justify-center items-center sm:flex-row sm:justify-evenly'>
				<div className='mb-2'>
					<input
						className='px-3 py-1 rounded-full border border-gray-600'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						type="text"
						placeholder="Nombre del producto"
					/>
				</div>
				<div className='mb-2'>
					<input
						className='px-3 py-1 rounded-full border border-gray-600'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
						type="number"
						step="0.01"
						min="0"
						placeholder="Precio"
					/>
				</div>
				<div className='mb-2'>
					<input
						className='px-3 py-1 rounded-full border border-gray-600'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						type="text"
						placeholder="Descripción (opcional)"
					/>
				</div>
				<div className='mb-2'>
					<button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full">
						Agregar Producto
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddProduct;