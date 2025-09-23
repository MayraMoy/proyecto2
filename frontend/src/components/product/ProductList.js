import { Link } from "react-router-dom";

const ProductList = ({ products, loading, deleteProduct }) => {
  return (
    <div className='py-5'>
      {loading && <p className="text-center">Cargando productos...</p>}
      {products && products.length === 0 && !loading && (
        <p className="text-center text-gray-500">No hay productos disponibles</p>
      )}
      {products && products.length > 0 &&
        <div className="grid gap-4">
          {products.map((product) =>
            <div className='flex justify-between items-center border-b-4 bg-white p-4 rounded-lg shadow-sm' key={product.id}>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <h3 className='font-semibold text-lg text-gray-800'>{product.name}</h3>
                  <span className='text-green-600 font-bold sm:ml-4'>${product.price}</span>
                </div>
                {product.description && (
                  <p className='text-gray-600 text-sm mt-1'>{product.description}</p>
                )}
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  {product.category && <span>Categoría: {product.category}</span>}
                  <span>Stock: {product.stock}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 ml-4">
                <Link to={`/products/edit/${product.id}`}>
                  <button
                    className='px-3 py-1 text-green-800 hover:bg-green-400 hover:rounded-md hover:border hover:border-green-800 transition-colors'
                  >EDITAR</button>
                </Link>
                <button
                  className='px-3 py-1 text-red-800 hover:bg-red-400 hover:rounded-md hover:border hover:border-red-800 transition-colors'
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                      deleteProduct(product.id);
                    }
                  }}
                >ELIMINAR</button>
              </div>
            </div>
          )}
        </div>
      }
    </div >
  )
}

export default ProductList;