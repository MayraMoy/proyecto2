// components/product/HomeProduct
import axios from "axios";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const HomeProduct = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios.get("http://127.0.0.1:8000/product")
      .then(response => {
        setProduct(response.data)
      })
    setLoading(false)
  }, [])

  const deleteProduct = (id) => {
    axios.delete(`http://127.0.0.1:8000/product/${id}`).then((response) => {
      const newProduct = products.filter((product) => product.id !== id);
      console.log(response)
      setProduct(newProduct);
    }).catch(error => {
      console.log(error)
    });
  }

  return (
    <div className="max-w-xl pb-8 mx-auto px-5 bg-slate-100">
      <ProductList
        products={products}
        loading={loading}
        deleteProduct={deleteProduct}
      />
      <AddProduct
        products={products}
        setProduct={setProduct}
      />
    </div>
  );
}

export default HomeProduct;