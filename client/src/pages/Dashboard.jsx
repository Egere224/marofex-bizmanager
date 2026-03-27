import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDashboardSummary } from "../services/dashboardService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function Dashboard() {

  const { businessId } = useParams();

  const [summary, setSummary] = useState(null);



  /*
  ------------------------------
  Load dashboard
  ------------------------------
  */

  useEffect(() => {
    loadDashboard();
  }, [businessId]);


  const loadDashboard = async () => {
    try {

      const res = await getDashboardSummary(businessId);
      console.log("dashboard summary", res)

      setSummary(res.data);

    } catch (error) {
      console.error(error);
    }
  };



  if (!summary) {
    return <div className="p-6">Loading dashboard...</div>;
  }



  return (

    <div className="p-4 sm:p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">

  {/* Page title */}

  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
    Dashboard
  </h1>



  {/* SALES STATS */}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-4">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Today's Sales
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {summary.today_sales}
      </h2>

    </div>



    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-4">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Today's Revenue
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        ₦{summary.today_revenue}
      </h2>

    </div>



    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-4">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Today's Balance
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        ₦{summary.total_balance}
      </h2>

    </div>



    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-4">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Outstanding Balance
      </p>

      <h2 className="text-2xl font-semibold text-red-600">
        ₦{summary.outstanding_balance}
      </h2>

    </div>

  </div>



  {/* INVENTORY STATS */}

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-4">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Products
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {summary.total_products}
      </h2>

    </div>



    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-4">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Low Stock Products
      </p>

      <h2 className="text-2xl font-semibold text-red-600">
        {summary.low_stock_products}
      </h2>

    </div>

  </div>



  {/* TOP PRODUCTS CHART */}

  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-4 sm:p-6">

    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
      Top Products Today
    </h2>

    <ResponsiveContainer width="100%" height={300}>

      <BarChart data={summary.top_products_today}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="product_name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="quantity_sold"
          fill="#2563eb"
          name="Quantity Sold"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

  );
}

export default Dashboard;