import { useEffect, useState } from "react";
import { getDebtors } from "../services/debtorsService";
import { useParams, useNavigate } from "react-router-dom";

function Debtors() {
  const { businessId } = useParams();
  const navigate = useNavigate();

  const [debtors, setDebtors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDebtors = async () => {
    try {
      const res = await getDebtors(businessId);
      console.log("debtors", res)
      setDebtors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebtors();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-3xl mx-auto p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Debtors</h2>
        <p className="text-gray-500 dark:text-gray-200">
          Customers who owe you money
        </p>
      </div>

      {/* EMPTY STATE */}
      {debtors.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-white">
          No debtors 🎉
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">

            {/* TABLE HEAD */}
            <thead className="bg-gray-100 dark:bg-white/5">
              <tr>
                <th className="p-4 text-left dark:text-white">Customer</th>
                <th className="p-4 text-left dark:text-white">Phone</th>
                <th className="p-4 text-left dark:text-white">Total Debt</th>
                <th className="p-4 text-left dark:text-white">Sales</th>
                <th className="p-4 text-left dark:text-white">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {debtors.map((d) => (
                <tr
                  key={d.id}
                  className="border-t border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition cursor-pointer"
                  onClick={() =>
                    navigate(`/businesses/${businessId}/debtors/${d.id}`)
                  }
                >
                  <td className="p-4 font-semibold dark:text-white">{d.name}</td>

                  <td className="p-4 text-gray-500 dark:text-white">{d.phone}</td>

                  <td className="p-4 text-red-500 font-bold">
                    ₦{d.total_debt}
                  </td>

                  <td className="p-4 dark:text-white">{d.total_sales}</td>

                  <td
                    className="p-4"
                    onClick={(e) => e.stopPropagation()} // prevent row click
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/businesses/${businessId}/debtors/${d.id}`
                        )
                      }
                      className="px-4 py-2 rounded-lg text-white
                      bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400
                      hover:scale-105 transition"
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      </div>
    </div>
  );
}

export default Debtors;