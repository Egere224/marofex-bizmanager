import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

function Products() {

  // gets businessId from the URL
  const { businessId } = useParams();

  // products list from backend
  const [products, setProducts] = useState([]);

  // form states for creating product
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // editing states
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  // search state
  const [search, setSearch] = useState("");

  // pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // load products when page, business or search changes
  useEffect(() => {
    fetchProducts();
  }, [businessId, page, search]);

  // fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await getProducts(businessId, { page, search });

      console.log("FULL RESPONSE:", res);

    const payload = res.data;

    setProducts(payload.products || []);
    setTotalPages(payload.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  // create product
  const handleCreate = async (e) => {
    e.preventDefault();

    try {

      await createProduct(businessId, {
        name,
        price,
        quantity,
      });

      setName("");
      setPrice("");
      setQuantity("");

      fetchProducts();

    } catch (error) {
      console.error(error);
    }
  };

  // start editing product
  const startEdit = (product) => {

    setEditingId(product.id);

    setEditName(product.name);
    setEditPrice(product.price);
    setEditQuantity(product.quantity);
  };

  // update product
  const handleUpdate = async (id) => {

    try {

      await updateProduct(businessId, id, {
        name: editName,
        price: editPrice,
        quantity: editQuantity,
      });

      setEditingId(null);

      fetchProducts();

    } catch (error) {
      console.error(error);
    }
  };

  // delete product
  const handleDelete = async (id) => {

    try {

      await deleteProduct(businessId, id);

      fetchProducts();

    } catch (error) {
      console.error(error);
    }
  };

  return (
   <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div className="w-full max-w-md sm:max-w-lg md:max-w-3xl mx-auto p-4 sm:p-6">

  {/* PAGE HEADER */}

  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
      Products
    </h1>
  </div>


  {/* SEARCH */}

  <input
    type="text"
    placeholder="Search product..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-4 w-full sm:w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
  />


  {/* CREATE PRODUCT FORM */}

  <form
    onSubmit={handleCreate}
    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-3"
  >

    <input
      type="text"
      placeholder="Product name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />

    <input
      type="number"
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full sm:w-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />

    <input
      type="number"
      placeholder="Quantity"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full sm:w-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />

    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded w-full sm:w-auto">
      Add
    </button>

  </form>


  {/* PRODUCTS TABLE */}

  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg overflow-x-auto">

    <table className="w-full text-left">

      <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <tr>
          <th className="p-4 text-gray-700 dark:text-gray-200">Product</th>
          <th className="p-4 text-gray-700 dark:text-gray-200">Price</th>
          <th className="p-4 text-gray-700 dark:text-gray-200">Stock</th>
          <th className="p-4 text-right text-gray-700 dark:text-gray-200">Actions</th>
        </tr>
      </thead>

      <tbody>

        {products.map((product) => (

          <tr
            key={product.id}
            className="border-b border-gray-200 dark:border-gray-700"
          >

            {editingId === product.id ? (

              <>
                <td className="p-4">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </td>

                <td className="p-4">
                  <input
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </td>

                <td className="p-4">
                  <input
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-20 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </td>

                <td className="p-4 text-right space-x-2">

                  <button
                    onClick={() => handleUpdate(product.id)}
                    className="text-green-600 dark:text-green-400"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    Cancel
                  </button>

                </td>

              </>

            ) : (

              <>
                <td className="p-4 font-medium text-gray-900 dark:text-white">
                  {product.name}
                </td>

                <td className="p-4 text-gray-700 dark:text-gray-300">
                  ₦{product.price}
                </td>

                <td className="p-4 text-gray-700 dark:text-gray-300">
                  {product.quantity}
                </td>

                <td className="p-4 text-right space-x-4">

                  <button
                    onClick={() => startEdit(product)}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 dark:text-red-400"
                  >
                    Delete
                  </button>

                </td>
              </>
            )}

          </tr>

        ))}

      </tbody>

    </table>

  </div>


  {/* PAGINATION */}

  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">

    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300"
    >
      Previous
    </button>

    <span className="text-gray-700 dark:text-gray-300">
      Page {page} of {totalPages}
    </span>

    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 text-gray-700 dark:text-gray-300"
    >
      Next
    </button>

  </div>
</div>
</div>
  );
}

export default Products;