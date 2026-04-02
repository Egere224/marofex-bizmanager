import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  createSale,
  addSaleItem,
  addSalePayment,
  getSaleDetails
} from "../services/salesService";

import { getProducts } from "../services/productService";
import { getCustomers } from "../services/customerService";

function Sales() {

  const { businessId } = useParams();

  const [saleId, setSaleId] = useState(null);
  const [sale, setSale] = useState(null);
  const [items, setItems] = useState([]);

  const [products, setProducts] = useState([]); // ✅ NEW

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [customers, setCustomers] = useState([]);
const [customerId, setCustomerId] = useState("");

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");



  /*
  ---------------------------------
  Load Products (NEW)
  ---------------------------------
  */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getProducts(businessId);

        const payload = res.data || res;

        setProducts(payload.products || payload);
        console.log("PRODUCT RESPONSE:", res);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, [businessId]);

  useEffect(() => {
  const loadCustomers = async () => {
    try {
    const res = await getCustomers(businessId);
    const payload = res.data || res;
    setCustomers(payload.customers || payload);
    console.log("Customer RESPONSE:", res);
      } catch (error) {
        console.error(error);
      }
  };

  loadCustomers();
}, [businessId]);



  /*
  ---------------------------------
  Load Sale Details
  ---------------------------------
  */

  const loadSale = async (id) => {
    try {
      const res = await getSaleDetails(businessId, id);

      console.log("SALE DETAILS:", res);

      const payload = res.data || res;

      setSale(payload.sale);
      setItems(payload.items);
      console.log("PRODUCTS STATE:", payload);

    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    if (saleId) {
      loadSale(saleId);
    }
  }, [saleId, businessId]);



  /*
  ---------------------------------
  Create Sale
  ---------------------------------
  */

  const handleCreateSale = async () => {
    try {
      const res = await createSale(businessId, {
        customer_id: customerId || null
      });

      console.log("FULL CREATE SALE RESPONSE:", res);

      const sale = res.data;

      if (!sale?.id) {
        console.error("SALE ID MISSING:", res);
        return;
      }

      setSaleId(sale.id);
      loadSale(sale.id);

    } catch (error) {
      console.error(error);
    }
  };



  /*
  ---------------------------------
  Add Item
  ---------------------------------
  */

  const handleAddItem = async (e) => {

    e.preventDefault();

    if (!saleId) {
  alert("Create a sale first");
  return;
}

    if (!productId || !quantity) {
      alert("Select product and quantity");
      return;
    }

    try {
        console.log("i ssent request")

      await addSaleItem(businessId, saleId, {
        product_id: productId,
        quantity
      });

      console.log("request sent")

      setProductId("");
      setQuantity("");

      loadSale(saleId);

    } catch (error) {
      console.error(error);
    }
  };



  /*
  ---------------------------------
  Add Payment
  ---------------------------------
  */

  const handlePayment = async (e) => {

    e.preventDefault();

    try {

      await addSalePayment(businessId, saleId, {
        amount: paymentAmount,
        payment_method: paymentMethod
      });

      setPaymentAmount("");

      loadSale(saleId);

    } catch (error) {
      console.error(error);
    }
  };



  return (

  <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">

    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
      Sales
    </h1>

    {/* -------------------- */}
    {/* SELECT CUSTOMER */}
    {/* -------------------- */}

    {!saleId && (
      <div className="mb-4">
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Walk-in customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
    )}

    {/* -------------------- */}
    {/* CREATE SALE */}
    {/* -------------------- */}

    {!saleId && (
      <button
        onClick={handleCreateSale}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
      >
        Start New Sale
      </button>
    )}

    {/* -------------------- */}
    {/* SALE DETAILS */}
    {/* -------------------- */}

    {sale && (

      <div className="mt-6">

        <div className="mb-6 text-gray-800 dark:text-gray-200">

          <h2 className="text-lg font-semibold">
            Sale #{sale.id}
          </h2>

          {/* ✅ SHOW CUSTOMER */}
          <p>
            Customer: {
              customers.find(c => c.id == sale.customer_id)?.name || "Walk-in"
            }
          </p>

          <p>Total: ₦{sale.total_amount}</p>
          <p>Balance: ₦{sale.balance}</p>

        </div>



        {/* -------------------- */}
        {/* ADD ITEM */}
        {/* -------------------- */}

        <form
          onSubmit={(e) => {
            if (!saleId) {
              alert("Start a sale first");
              return;
            }
            handleAddItem(e);
          }}
          className="bg-white dark:bg-gray-800 border shadow rounded p-4 mb-6 flex flex-col sm:flex-row gap-3"
        >

          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (₦{product.price})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />

          <button
            className="bg-green-600 text-white px-5 py-2 rounded"
            type="submit"
          >
            Add Item
          </button>

        </form>



        {/* -------------------- */}
        {/* ITEMS TABLE */}
        {/* -------------------- */}

        <div className="bg-white dark:bg-gray-800 border shadow rounded-lg overflow-x-auto mb-6">

          <table className="w-full text-left">

            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3">Subtotal</th>
              </tr>
            </thead>

            <tbody>

              {items.map((item) => (

                <tr key={item.id}>

                  <td className="p-3">
                    {
                      products.find(p => p.id === item.product_id)?.name || "Unknown"
                    }
                  </td>

                  <td className="p-3">{item.quantity}</td>

                  <td className="p-3">₦{item.unit_price}</td>

                  <td className="p-3">₦{item.subtotal}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>



        {/* -------------------- */}
        {/* PAYMENT */}
        {/* -------------------- */}

        <form
          onSubmit={(e) => {
            if (!saleId) {
              alert("Start a sale first");
              return;
            }
            handlePayment(e);
          }}
          className="bg-white dark:bg-gray-800 border shadow rounded p-4 flex gap-3"
        >

          <input
            type="number"
            placeholder="Amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="cash">Cash</option>
            <option value="transfer">Transfer</option>
            <option value="card">Card</option>
          </select>

          <button
            className="bg-purple-600 text-white px-5 py-2 rounded"
            type="submit"
          >
            Pay
          </button>

        </form>

      </div>

    )}
 </div>
  </div>
);
}

export default Sales;