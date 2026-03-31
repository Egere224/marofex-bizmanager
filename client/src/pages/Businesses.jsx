import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBusinesses,
  createBusiness,
  getBusinessById,
  deleteBusiness,
} from "../services/businessService";
import { useBusiness } from "../context/BusinessContext"
function Businesses() {
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);
  const { setBusiness } = useBusiness();

  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("NGN");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await getBusinesses();
      setBusinesses(res.data || res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBusiness = async (e) => {
    e.preventDefault();


    if (!name) return;

    try {
     const newBusiness = await createBusiness({
        name,
        currency,
      });

      setBusinesses((prev) => [newBusiness, ...prev]);

      setName("");
      setCurrency("NGN");

      await fetchBusinesses();

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBusiness = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this business?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBusiness(id);

      setBusinesses((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const openBusiness = async (business) => {
    try {
    const res = await getBusinessById(business.id);
    const fullBusiness = res.data || res;
  
    setBusiness(fullBusiness);
    navigate(`/businesses/${business.id}/dashboard`);
    } catch (error) {
      console.error(error);
    }
  };
  

  if (loading) {
    return <div className="p-6">Loading businesses...</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">

  {/* Header */}
  <div className="max-w-5xl mx-auto mb-4 sm:mb-8 mt-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
      Your Businesses
    </h1>

    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
      Select a business to manage your inventory and sales.
    </p>
  </div>

  <div className="max-w-5xl mx-auto">

    {/* Create Business */}
    <form
      onSubmit={handleCreateBusiness}
      className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 mb-8 flex flex-col sm:flex-row gap-4 border border-gray-200 dark:border-gray-700">

      <input
        type="text"
        placeholder="Business name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
      />

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-auto"
      >
        <option value="NGN">NGN</option>
        <option value="USD">USD</option>
        <option value="GHS">GHS</option>
      </select>

      <button type="submit" onClick={() => console.log("BUTTON CLICKED")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full sm:w-auto">
        Create
      </button>

    </form>

    {/* Businesses List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      {businesses.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No businesses yet.
        </p>
      )}

      {businesses.map((business) => (

        <div
          key={business.id}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 hover:shadow-md transition border border-gray-200 dark:border-gray-700"
        >

          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {business.name}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Currency: {business.currency}
          </p>

          <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
            Status:{" "}
            <span className="font-medium">
              {business.status || "inactive"}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 items-start sm:items-center">

            <button
              onClick={() => openBusiness(business)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Open
            </button>

            <button
              onClick={() => handleDeleteBusiness(business.id)}
              className="text-red-600 hover:text-red-500"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>
  );
}

export default Businesses;