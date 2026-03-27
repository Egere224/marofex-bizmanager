export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Simple Pricing
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
        Start with a 14-day free trial. No credit card required.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="border p-8 rounded-xl text-center dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">
            Starter
          </h2>

          <p className="text-3xl font-bold mb-6">
            ₦5,000/mo
          </p>

          <ul className="text-gray-600 dark:text-gray-400 space-y-2 mb-6">
            <li>1 Business</li>
            <li>Inventory Tracking</li>
            <li>Sales Recording</li>
          </ul>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Start Free Trial
          </button>
        </div>

        <div className="border p-8 rounded-xl text-center dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">
            Growth
          </h2>

          <p className="text-3xl font-bold mb-6">
            ₦10,000/mo
          </p>

          <ul className="text-gray-600 dark:text-gray-400 space-y-2 mb-6">
            <li>3 Businesses</li>
            <li>Debt Tracking</li>
            <li>Sales Analytics</li>
          </ul>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Start Free Trial
          </button>
        </div>

        <div className="border p-8 rounded-xl text-center dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">
            Business
          </h2>

          <p className="text-3xl font-bold mb-6">
            ₦20,000/mo
          </p>

          <ul className="text-gray-600 dark:text-gray-400 space-y-2 mb-6">
            <li>Unlimited Businesses</li>
            <li>Advanced Reports</li>
            <li>Priority Support</li>
          </ul>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Start Free Trial
          </button>
        </div>

      </div>

    </div>
  );
}