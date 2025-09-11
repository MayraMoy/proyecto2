import React, { useState } from 'react';
import axios from "axios";

const AddUser = ({ setUsers, users }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://127.0.0.1:8000/signup", {
				email: email,
				password: password
			})
			.then((res) => {
				const nuevoUsuario = {
					id: res.data.id,
					name: res.data.email,
					username: res.data.email
				};

				setUsers([...users, nuevoUsuario]);
				setEmail('');
				setPassword('');
			})
			.catch((err) => {
				console.error("Error al crear usuario:", err);
				alert("Error al registrar usuario");
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-col justify-center items-center sm:flex-row sm:justify-evenly'>
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
					<input
						className='px-3 py-1 rounded-full border border-gray-600'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						type="password"
						placeholder="Password"
					/>
				</div>
				<div className='mb-2'>
					<button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full">
						Registrar
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddUser;
