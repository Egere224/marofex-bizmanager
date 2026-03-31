import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaChartLine,
  FaBolt,
  FaRocket,
  FaLock,
  FaCogs,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";

import about from "../assets/about.jpeg";
import heroDark from "../assets/heroDark.jpeg";
import heroLight from "../assets/heroLight.jpeg";

import FadeInSection from "../components/FadeInSection";

function Landing() {

const texts = [
  "Effortlessly",
  "Like a Pro",
  "With Ease",
  "Anywhere Anytime!",
  "In Real Time"
];

const [index, setIndex] = useState(0);

useEffect(() => {
  let i = 0;

  const interval = setInterval(() => {
    i++;
    setIndex(i % texts.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

console.log("current index:", index);
const changingText = texts[index];
  return (
    <div className="relative bg-gray-50 dark:bg-[#020617] dark:text-white transition-colors duration-300 min-h-screen overflow-hidden">

      {/* ================= DARK MODE NEON BACKGROUND ================= */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none">

        <div className="absolute -top-50 left-1/2 -translate-x-1/2 w-225 h-225
        bg-linear-to-r from-purple-600 via-indigo-500 to-cyan-400
        opacity-30 blur-[200px] rounded-full" />

        <div className="absolute -bottom-50 right--50 w-200 h-200
        bg-linear-to-r from-indigo-600 to-purple-500
        opacity-20 blur-[200px] rounded-full" />

      </div>


      {/* ================= HERO SECTION ================= */}

      <section className="max-w-7xl mx-auto px-5 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* HERO TEXT */}
        <div className="text-center md:text-left space-y-6">

          <p className="text-shadow-gray-50 font-semibold tracking-widest mb-4">
           <small className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
  Marofex
</small> BUSINESS MANAGER
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Manage Your Business Inventory
            <span
  key={changingText}
  className="block text-indigo-400 mt-2 animate-fadeSlide"
>
  {changingText}
</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-md md:max-w-lg mx-auto md:mx-0 text-sm sm:text-base md:text-lg">
            Track stock, record sales, manage customer debts, and monitor your
            business performance all from one powerful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <Link
              to="/register"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full font-semibold text-white
               bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 hover:scale-105 transition"
            >
              Start Free Trial
            </Link>

            <Link
              to="/pricing"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600
              hover:border-cyan-400 transition"
            >
              View Pricing
            </Link>

          </div>

          <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
            14-day free trial • No credit card required
          </p>

        </div>


       {/* HERO VISUAL */}
<div className="relative mt-10 md:mt-0 flex justify-center">

  {/* dashboard image */}
  <img
    src={heroLight}
    alt="Marofex dashboard preview"
    className="block dark:hidden w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-2xl shadow-2xl"
  />

  <img
    src={heroDark}
    alt="Marofex dashboard preview"
    className="hidden dark:block w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-2xl shadow-2xl"
  />

</div>
      </section>



      {/* ================= FEATURES ================= */}

     <section className="relative overflow-hidden py-24">

  {/* 🌈 Background glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]" />
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-cyan-200/20 blur-3xl opacity-40" />

  <div className="relative max-w-7xl mx-auto px-6">

    {/* 🔥 Section Title */}
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
      Everything You Need to Run Your Business
    </h2>

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* CARD 1 */}
      <div className="group p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl 
      border border-white/40 dark:border-white/10 shadow-lg hover:shadow-2xl 
      hover:-translate-y-2 transition duration-300">

        <FaBoxOpen className="text-cyan-400 text-3xl mb-4 
        drop-shadow-[0_0_12px_rgba(6,182,212,0.7)] group-hover:scale-110 transition" />

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Inventory Management
        </h3>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Stay in control of your stock at all times. Know what’s available,
          what’s running low, and never miss a sale due to stockouts.
        </p>

      </div>


      {/* CARD 2 */}
      <div className="group p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl 
      border border-white/40 dark:border-white/10 shadow-lg hover:shadow-2xl 
      hover:-translate-y-2 transition duration-300">

        <FaChartLine className="text-indigo-400 text-3xl mb-4 
        drop-shadow-[0_0_12px_rgba(99,102,241,0.7)] group-hover:scale-110 transition" />

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Sales Tracking
        </h3>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Record every transaction instantly and get real-time insights into
          your daily revenue, profit, and business performance.
        </p>

      </div>


      {/* CARD 3 */}
      <div className="group p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl 
      border border-white/40 dark:border-white/10 shadow-lg hover:shadow-2xl 
      hover:-translate-y-2 transition duration-300">

        <FaUsers className="text-purple-400 text-3xl mb-4 
        drop-shadow-[0_0_12px_rgba(168,85,247,0.7)] group-hover:scale-110 transition" />

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Customer Debt Tracking
        </h3>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Track who owes you and how much. Manage customer balances and
          payments with clarity and confidence.
        </p>

      </div>

    </div>
  </div>
</section>



      {/* ================= HOW IT WORKS ================= */}

      <FadeInSection>
  <section className="relative bg-gray-50 dark:bg-[#020617] overflow-hidden py-24">

    {/* 🌌 SUBTLE DARK GLOW */}
    <div className="hidden dark:block absolute inset-0 pointer-events-none">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px]
      bg-gradient-to-r from-indigo-500 to-purple-500
      opacity-10 blur-[140px] rounded-full" />

    </div>

    <div className="relative max-w-6xl mx-auto px-6 text-center">

      <h2 className="text-3xl md:text-4xl font-bold mb-14 text-gray-900 dark:text-white">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-10">

        <div className="group">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full
          bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md
          group-hover:scale-110 transition">
            <FaCheckCircle className="text-xl" />
          </div>

          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
            Create Account
          </h3>

          <p className="text-gray-600 dark:text-gray-400">
            Register and get access to a 14-day free trial.
          </p>
        </div>

        <div className="group">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full
          bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md
          group-hover:scale-110 transition">
            <FaCheckCircle className="text-xl" />
          </div>

          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
            Add Your Business
          </h3>

          <p className="text-gray-600 dark:text-gray-400">
            Create a business and start adding your products and customers.
          </p>
        </div>

        <div className="group">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full
          bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md
          group-hover:scale-110 transition">
            <FaCheckCircle className="text-xl" />
          </div>

          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
            Start Managing Sales
          </h3>

          <p className="text-gray-600 dark:text-gray-400">
            Track inventory, sales, and payments from your dashboard.
          </p>
        </div>

      </div>

    </div>

  </section>
</FadeInSection>

      <section className="relative max-w-7xl mx-auto px-6 py-20">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>

  <div className="grid md:grid-cols-2 gap-12 items-start">

    {/* TEXT */}
    <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
      
      <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
        About{" "}
        <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
          Marofex
        </span>
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-5 text-base md:text-lg leading-relaxed text-justify ">
        Marofex is a modern business management platform designed to help small and growing businesses stay organized, track performance, and make smarter decisions in today’s fast-paced digital environment. It combines simplicity with powerful functionality, allowing business owners to manage operations without stress.
      </p>

      <p className="text-gray-600 dark:text-gray-300 mb-5 text-base md:text-lg leading-relaxed text-justify ">
        From inventory tracking to sales monitoring and customer debt management, Marofex simplifies your daily workflow, giving you full visibility and control over every part of your business. Everything is built to save time, reduce errors, and improve efficiency.
      </p>

      <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed text-justify ">
        Whether you’re running a small shop or scaling a growing enterprise, Marofex provides the tools and insights you need to grow confidently, make informed decisions, and stay ahead in a competitive market.
      </p>

    </div>

    {/* VISUAL SIDE */}
    <div className="space-y-8">

      {/* IMAGE */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl md:shadow-2xl border border-white/10">
        <img
          src={about}
          alt="Business discussion"
          className="w-full h-auto object-cover transition duration-500 hover:scale-[1.02]"
        />

        {/* LIGHT MODE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-10 dark:hidden"></div>

      
      </div>

      {/* FEATURE CARD */}
      <div className="
        bg-white/90 dark:bg-white/5
        backdrop-blur-xl
        border border-gray-200 dark:border-white/10
        rounded-2xl p-6 shadow-xl
        dark:shadow-[0_0_25px_rgba(168,85,247,0.2)]
      ">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          What You Can Do
        </h3>

        <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">

          <li className="flex items-center gap-3">
            <span className="text-purple-500">✔</span>
            Track inventory in real-time
          </li>

          <li className="flex items-center gap-3">
            <span className="text-indigo-500">✔</span>
            Record and monitor sales
          </li>

          <li className="flex items-center gap-3">
            <span className="text-blue-500">✔</span>
            Manage customer debts
          </li>

          <li className="flex items-center gap-3">
            <span className="text-green-500">✔</span>
            View business performance insights
          </li>

        </ul>
      </div>

    </div>

  </div>

</section>
<section className="relative max-w-7xl mx-auto px-6 py-20">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>

  {/* HEADER */}
  <div className="text-center max-w-2xl mx-auto mb-16">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
      Why Choose{" "}
      <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
        Marofex
      </span>
    </h2>

    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
      Everything you need to run, manage, and grow your business efficiently — all in one powerful platform.
    </p>
  </div>

  {/* GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

    {/* CARD 1 */}
    <div className="group p-6 rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl dark:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition duration-300">
      <div className="flex items-start gap-4">
        <div className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md group-hover:scale-110 transition">
          <FaBolt />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Simple & Easy
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Get started quickly without complicated setup or training.
          </p>
        </div>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="group p-6 rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl dark:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition duration-300">
      <div className="flex items-start gap-4">
        <div className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md group-hover:scale-110 transition">
          <FaUsers />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            All-in-One Platform
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Manage inventory, sales, and customers from one dashboard.
          </p>
        </div>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="group p-6 rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl dark:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition duration-300">
      <div className="flex items-start gap-4">
        <div className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md group-hover:scale-110 transition">
          <FaChartLine />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Real-Time Insights
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Monitor your business performance instantly.
          </p>
        </div>
      </div>
    </div>

    {/* CARD 4 */}
    <div className="group p-6 rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl dark:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition duration-300">
      <div className="flex items-start gap-4">
        <div className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md group-hover:scale-110 transition">
          <FaRocket />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Scalable
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Built to grow with your business as you expand.
          </p>
        </div>
      </div>
    </div>

    {/* CARD 5 */}
    <div className="group p-6 rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl dark:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition duration-300">
      <div className="flex items-start gap-4">
        <div className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md group-hover:scale-110 transition">
          <FaLock />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Secure
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Your data is protected with reliable and secure systems.
          </p>
        </div>
      </div>
    </div>

    {/* CARD 6 */}
    <div className="group p-6 rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl dark:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition duration-300">
      <div className="flex items-start gap-4">
        <div className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md group-hover:scale-110 transition">
          <FaCogs />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Fast Performance
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Enjoy a smooth and responsive experience across devices.
          </p>
        </div>
      </div>
    </div>

  </div>

</section>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>

  {/* HEADING */}
  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-5 sm:mb-6 text-gray-900 dark:text-white leading-tight">
    Built for{" "}
    <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
      Real Business Owners
    </span>
  </h2>

  {/* SUBTEXT */}
  <p className="text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-10 sm:mb-14">
    Whether you run a small shop, manage inventory, or track customer debts,
    Marofex helps you stay organized, make smarter decisions, and grow your business with confidence.
  </p>

  {/* VALUE POINTS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">

    {/* CARD */}
    <div className="p-5 sm:p-6 rounded-xl bg-white/90 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-white/10 shadow-sm sm:shadow-md text-left">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
        Save Time
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        Automate daily tasks and reduce manual work.
      </p>
    </div>

    {/* CARD */}
    <div className="p-5 sm:p-6 rounded-xl bg-white/90 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-white/10 shadow-sm sm:shadow-md text-left">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
        Stay Organized
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        Keep all your business data in one place.
      </p>
    </div>

    {/* CARD */}
    <div className="p-5 sm:p-6 rounded-xl bg-white/90 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-white/10 shadow-sm sm:shadow-md text-left">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
        Grow Faster
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        Make better decisions with real-time insights.
      </p>
    </div>

  </div>

</section>

<section className="max-w-6xl mx-auto px-6 py-20 text-center">

  <h2 className="text-3xl md:text-4xl font-bold mb-12">
    What Our Users Say
  </h2>

  <div className="grid md:grid-cols-2 gap-8">

    <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow">
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        “Marofex completely changed how I manage my business. Tracking sales and debts is now effortless.”
      </p>
      <span className="font-semibold text-sm">— Business Owner</span>
    </div>

    <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow">
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        “I finally have full control over my inventory. This platform is exactly what I needed.”
      </p>
      <span className="font-semibold text-sm">— Retail Manager</span>
    </div>

  </div>

</section>

      {/* ================= CTA ================= */}

      <section className="bg-linear-to-r from-indigo-600 to-purple-600 py-20 text-center">

        <h2 className="text-3xl font-bold text-white mb-4">
          Start Your 14-Day Free Trial Today
        </h2>

        <p className="text-indigo-100 mb-8">
          No credit card required. Cancel anytime.
        </p>

        <Link
          to="/register"
          className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:scale-105 transition"
        >
          Get Started
        </Link>

      </section>



      {/* ================= FOOTER ================= */}

      <footer className="bg-gray-900 text-gray-400 py-10">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p>© {new Date().getFullYear()} BizManager</p>

          <div className="flex gap-6">

            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>

            <Link to="/pricing" className="hover:text-white">
              Pricing
            </Link>

            <Link to="/login" className="hover:text-white">
              Login
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Landing;