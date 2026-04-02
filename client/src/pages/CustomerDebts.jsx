import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerDebts } from "../services/debtorsService";
import api from "../services/api";

function CustomerDebts() {
  const { businessId, customerId } = useParams();
  const navigate = useNavigate();

  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount || 0);
  };

  // 🔥 MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // =============================
  // FETCH DATA
  // =============================
  const fetchDebts = async () => {
    try {
      const res = await getCustomerDebts(businessId, customerId);
      setDebts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  // 🔥 GET CUSTOMER NAME
  const customerName = debts[0]?.customer_name || "Customer";

  // =============================
  // OPEN MODAL
  // =============================
 const [selectedBalance, setSelectedBalance] = useState(0);

const openModal = (saleId, balance) => {
  setSelectedSaleId(saleId);
  setSelectedBalance(balance);
  setShowModal(true);
};

  // =============================
  // CLOSE MODAL
  // =============================
  const closeModal = () => {
    setShowModal(false);
    setAmount("");
    setPaymentMethod("cash");
  };

  // =============================
  // SUBMIT PAYMENT
  // =============================
  const handlePayment = async (e) => {
  e.preventDefault();

  const numericAmount = Number(amount);

  if (!numericAmount) {
    alert("Enter amount");
    return;
  }

  // 🚫 PREVENT OVERPAYMENT
  if (numericAmount > selectedBalance) {
    alert("Amount cannot be greater than balance");
    return;
  }

  try {
    await api.post(
      `/businesses/${businessId}/sales/${selectedSaleId}/payments`,
      {
        amount: numericAmount,
        payment_method: paymentMethod,
      }
    );

    closeModal();
    fetchDebts();

  } catch (err) {
    console.error(err);
  }
};

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
     <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">

      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col gap-3">

        {/* 🔥 BACK BUTTON */}
        <button
          onClick={() => navigate(`/businesses/${businessId}/debtors`)}
          className="text-sm text-indigo-500 hover:underline w-fit"
        >
          ← Back to Debtors
        </button>

        {/*  TITLE */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            {customerName}'s Debts
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Outstanding sales for this customer
          </p>
        </div>

      </div>

      {/* ================= SUMMARY CARDS ================= */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

  {/* TOTAL DEBT */}
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700">
    <p className="text-gray-500 text-sm dark:text-white">Total Sales</p>
    <h3 className="text-xl font-bold text-blue-600">
      {formatCurrency( debts.reduce((sum, d) => sum + Number(d.total_amount), 0) )}
    </h3>
  </div>

  {/* TOTAL PAID */}
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700">
    <p className="text-gray-500 text-sm dark:text-white">Total Paid</p>
    <h3 className="text-xl font-bold text-green-500">
      {formatCurrency( debts.reduce((sum, d) => sum + Number(d.amount_paid), 0) )}
    </h3>
  </div>

  {/* OUTSTANDING */}
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700">
    <p className="text-gray-500 text-sm dark:text-white">Outstanding</p>
    <h3 className="text-xl font-bold text-red-500">
      {formatCurrency( debts.reduce((sum, d) => sum + Number(d.balance), 0) )}
    </h3>
  </div>

</div>

      {/* ================= EMPTY ================= */}
      {debts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-white">
          No outstanding debts 🎉
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 dark:text-white">Sale</th>
                <th className="p-3 dark:text-white">Total</th>
                <th className="p-3 dark:text-white">Paid</th>
                <th className="p-3 dark:text-white">Balance</th>
                <th className="p-3 dark:text-white">Date</th>
                <th className="p-3 dark:text-white">Action</th>
              </tr>
            </thead>

            <tbody>
              {debts.map((d) => (
                <tr
                  key={d.sale_id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3 font-medium dark:text-white">#{d.sale_id}</td>

                  <td className="p-3 dark:text-white">₦{d.total_amount}</td>

                  <td className="p-3 text-green-500">
                    ₦{d.amount_paid}
                  </td>

                  <td className="p-3 text-red-500 font-bold">
                    ₦{d.balance}
                  </td>

                  <td className="p-3 text-gray-500 dark:text-white">
                    {new Date(d.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => openModal(d.sale_id, d.balance)}
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 
                      text-white px-4 py-2 rounded hover:scale-105 transition"
                    >
                      Pay
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-md shadow-lg">

            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Make Payment
            </h3>
            <p className="text-sm text-gray-500">
  Balance: <span className="font-bold text-red-500">
    {formatCurrency(selectedBalance)}
  </span>
</p>

            <form onSubmit={handlePayment} className="space-y-4">

              <input
                type="number"
                inputMode="decimal"
                placeholder="Enter amount"
                value={amount}
                max={selectedBalance}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="cash">Cash</option>
                <option value="transfer">Transfer</option>
                <option value="card">Card</option>
              </select>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded text-gray-600 dark:text-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded text-white
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                >
                  Pay
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
</div>
    </div>
  );
}

export default CustomerDebts;