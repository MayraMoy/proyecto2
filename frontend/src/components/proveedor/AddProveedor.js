import React, { useState } from 'react';
import axios from "axios";

const AddProveedor = ({ setProveedores, proveedores }) => {
	const [nombre, setNombre] = useState("");
	const [direccion, setDireccion] = useState("");
	const [telefono, setTelefono] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://127.0.0.1:8000/proveedores", {
				nombre,
				direccion,
				telefono,
				email
			})
			.then((res) => {
				const nuevoProveedor = {
					id: res.data.id,
					nombre: res.data.nombre,
					direccion: res.data.direccion,
					telefono: res.data.telefono,
					email: res.data.email
				};

				setProveedores([...proveedores, nuevoProveedor]);
				setNombre('');
				setDireccion('');
				setTelefono('');
				setEmail('');
			})
			.catch((err) => {
				console.error("Error al crear proveedor:", err);
				alert("Error al registrar proveedor");
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-col justify-center items-center sm:flex-row sm:justify-evenly flex-wrap'>
				<div className='mb-2'>
					<input
						className='px-3 py-1 rounded-full border border-gray-600'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						required
						type="text"
						placeholder="Nombre del proveedor"
					/>
				</div>
				<div className='mb-2'>
					<input
						className='px-3 py-1 rounded-full border border-gray-600'
						value={direccion}
						onChange={(e) => setDireccion(e.target.value)}
						type="text"
						placeholder="Dirección"
					/>
				</div>
				<div className='mb-2'>
					<input
						className='px-3 py-1 rounded-full border border-gray-600'
						value={telefono}
						onChange={(e) => setTelefono(e.target.value)}
						type="text"
						placeholder="Teléfono"
					/>
				</div>
				<div className='mb-2'>
					<input
						className='px-3 py-1 rounded-full border border-gray-600'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						type="email"
						placeholder="Email"
					/>
				</div>
				<div className='mb-2'>
					<button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full">
						Registrar Proveedor
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddProveedor;
