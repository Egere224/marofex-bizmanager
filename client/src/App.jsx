import { BrowserRouter, Routes, Route } from "react-router-dom";

import MarketingLayout from "./components/layout/MarketingLayout";
import Landing from "./pages/Landing";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Businesses from "./pages/Businesses";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Debtors from "./pages/Debtors";
import CustomerDebts from "./pages/CustomerDebts";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Marketing pages */}
    <Route element={<MarketingLayout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/pricing" element={<Pricing />} />

      <Route path="/businesses" element={<Businesses />} />
    </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       

        {/* Protected dashboard */}
        <Route
          path="/businesses/:businessId"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="customers" element={<Customers />} />
          <Route path="debtors" element={<Debtors />} />
          <Route path="debtors/:customerId" element={<CustomerDebts />} />

        </Route>

        <Route
    path="/admin"
    element={
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route path="payments" element={<AdminPayments />} />
    {/* future admin routes */}
    <Route path="users" element={<div>Users</div>} />
    <Route path="businesses" element={<div>Businesses</div>} />
  </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;