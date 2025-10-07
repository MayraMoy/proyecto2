import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/users/${id}`)
      .then(response => {
        setEmail(response.data.email);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/users/${id}`, { email, password })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center items-center bg-slate-100 p-10 mt-10 rounded-md'>
          <input
            className='my-2 px-5 py-1 rounded-full border border-gray-600'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='my-2 px-5 py-1 rounded-full border border-gray-600'
            type="password"
            placeholder="Nueva contraseña (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex my-2">
            <button className='text-white mx-1 px-5 py-1 rounded-full bg-blue-500 hover:bg-blue-700'>
              GUARDAR
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className='text-white mx-1 px-5 py-1 rounded-full bg-gray-500 hover:bg-gray-700'
            >
              CANCELAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditUser;

