// components/product/ProductList
import { Link } from "react-router-dom";

const ProductList = ({ products, loading, deleteProduct }) => {
  return (
    <div className='py-5'>
      {loading && <p>loading ...</p>}
      {products &&
        <ul>
          {(products.map((product) =>
            <li className='flex justify-between border-b-4' key={product.id}>
              <div className="flex ">
                <p className='my-3 px-3'>{product.name}</p>
                <p className='my-3 px-3'>{product.price}</p>
	            	<p className='my-3 px-3'>{product.description}</p>
              </div>
              <div>
                <Link to={`/edit/${product.id}`}>
                  <button
                    className='mx-2 my-3 px-2 py-1 text-green-800
                       hover:bg-green-400 hover:rounded-md hover:border hover:border-green-800'
                  >EDIT</button>
                </Link>
                <button
                  className='my-3 px-2 py-1 text-red-800 
                        hover:bg-red-400 hover:rounded-md hover:border hover:border-red-800'
                  onClick={() => deleteProduct(product.id)}
                >Delete</button>
              </div>
            </li>
          ))}
        </ul >
      }
    </div >
  )
}

export default ProductList