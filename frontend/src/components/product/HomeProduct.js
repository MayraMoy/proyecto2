import axios from "axios";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/products")
      .then(response => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      })
  }, [])

  const deleteProduct = (id) => {
    axios.delete(`http://127.0.0.1:8000/products/${id}`)
      .then((response) => {
        const newProducts = products.filter((product) => product.id !== id);
        console.log(response)
        setProducts(newProducts);
      })
      .catch(error => {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar producto");
      });
  }

  return (
    <div className="max-w-4xl pb-8 mx-auto px-5 bg-slate-100">
      <h1 className="text-2xl font-bold text-center py-5">Gestión de Productos</h1>
      <ProductList
        products={products}
        loading={loading}
        deleteProduct={deleteProduct}
      />
      <AddProduct
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}

export default ProductHome;