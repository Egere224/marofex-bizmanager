import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

  const { login, user, token } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  if (token && token !== "undefined") {
    if (user?.role === "admin") {
      navigate("/admin/payments");
    } else {
      navigate("/businesses");
    }
  }
}, [token, user, navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await loginUser({ email, password });

const token = res.data.token;
const user = res.data.user || null;

login(user, token);

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");

    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors">

  <form
    onSubmit={handleSubmit}
    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg shadow w-full max-w-md"
  >

    <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
      Login
    </h1>



    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
      required
    />



    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded mb-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
      required
    />



    <button
    type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded transition"
    >
      Login
    </button>



    <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">

      Don't have an account?

      <span
        className="text-blue-600 dark:text-blue-400 cursor-pointer ml-1"
        onClick={() => navigate("/register")}
      >
        Register
      </span>

    </p>

  </form>

</div>

  );
}

export default Login;