import { Link } from "react-router-dom";

const ProveedorList = ({ proveedores, loading, deleteProveedor }) => {
  return (
    <div className='py-5'>
      {loading && <p>loading ...</p>}
      {proveedores && (
        <ul>
          {proveedores.map((prov) => (
            <li className='flex justify-between border-b-4' key={prov.id}>
              <div className="flex flex-col px-3">
                <p className='my-1'><strong>Nombre:</strong> {prov.nombre}</p>
                <p className='my-1'><strong>Dirección:</strong> {prov.direccion}</p>
                <p className='my-1'><strong>Teléfono:</strong> {prov.telefono}</p>
                <p className='my-1'><strong>Email:</strong> {prov.email}</p>
              </div>
              <div className="flex flex-col justify-center">
                <Link to={`/edit/${prov.id}`}>
                  <button
                    className='mx-2 my-1 px-2 py-1 text-green-800
                      hover:bg-green-400 hover:rounded-md hover:border hover:border-green-800'
                  >
                    EDITAR
                  </button>
                </Link>
                <button
                  className='mx-2 my-1 px-2 py-1 text-red-800 
                    hover:bg-red-400 hover:rounded-md hover:border hover:border-red-800'
                  onClick={() => deleteProveedor(prov.id)}
                >
                  ELIMINAR
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProveedorList;

