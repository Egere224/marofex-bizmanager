export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        BizManager Blog
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-12">
        Tips on managing inventory, tracking sales, and growing your business.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="p-6 rounded-lg border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">
            How to Track Inventory Easily
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Learn simple strategies for managing product stock without errors.
          </p>
        </div>

        <div className="p-6 rounded-lg border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">
            Managing Customer Debts
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Best practices for tracking outstanding balances.
          </p>
        </div>

        <div className="p-6 rounded-lg border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">
            Improve Your Daily Sales Tracking
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            See how BizManager helps you track revenue automatically.
          </p>
        </div>

      </div>

    </div>
  );
}