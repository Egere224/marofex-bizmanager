import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";

function Customers() {
  const { businessId } = useParams();

  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, [businessId]);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers(businessId);

      // handle backend response shape
      console.log("CUSTOMER RESPONSE:", res.data);

      setCustomers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createCustomer(businessId, {
        name,
        phone,
        address,
      });

      setName("");
      setPhone("");
      setAddress("");

      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (customer) => {
    setEditingId(customer.id);
    setEditName(customer.name);
    setEditPhone(customer.phone);
    setEditAddress(customer.address);
  };

  const handleUpdate = async (id) => {
    try {
      await updateCustomer(businessId, id, {
        name: editName,
        phone: editPhone,
        address: editAddress,
      });

      setEditingId(null);
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(businessId, id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">

      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Customers
        </h1>

        {/* Create Customer */}
        <form
          onSubmit={handleCreate}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded dark:text-white"
            required
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded dark:text-white"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded dark:text-white"
          />

          <button className="bg-blue-600 text-white py-2 rounded">
            Add Customer
          </button>
        </form>

        {/* Customers List */}
        {customers.length === 0 ? (
          <p className="text-gray-500 ">No customers yet.</p>
        ) : (
          <div className="space-y-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white dark:text-white dark:bg-gray-800 p-4 rounded shadow"
              >
                {editingId === customer.id ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border p-1 mr-2"
                    />

                    <input
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="border p-1 mr-2"
                    />

                    <input
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="border p-1 mr-2"
                    />

                    <button
                      onClick={() => handleUpdate(customer.id)}
                      className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold">{customer.name}</h2>
                    <p>{customer.phone}</p>
                    <p>{customer.address}</p>

                    <div className="mt-2 flex gap-3">
                      <button
                        onClick={() => startEdit(customer)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Customers;