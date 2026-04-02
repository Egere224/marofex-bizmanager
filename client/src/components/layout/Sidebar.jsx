import { NavLink, useParams } from "react-router-dom";

function Sidebar() {

  const { businessId } = useParams();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen p-4">

      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        BizManager
      </h2>

      <nav className="space-y-2">

        <NavLink
          to={`/businesses/${businessId}/dashboard`}
          className={linkClass}
        >
          Dashboard
        </NavLink>

        <NavLink
          to={`/businesses/${businessId}/products`}
          className={linkClass}
        >
          Products
        </NavLink>

        <NavLink
          to={`/businesses/${businessId}/sales`}
          className={linkClass}
        >
          Sales
        </NavLink>

        <NavLink
          to={`/businesses/${businessId}/customers`}
          className={linkClass}
        >
          Customers
        </NavLink>

         <NavLink
          to={`/businesses/${businessId}/debtors`}
          className={linkClass}
        >
          Debtors
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;