import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true)

    try {

      await registerUser({
        full_name: fullName,
        email,
        phone,
        password
      });

      alert("Registration successful");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

  <form
    onSubmit={handleSubmit}
    className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow w-full max-w-md border border-gray-200 dark:border-gray-700"
  >

    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center sm:text-left">
      Create Account
    </h1>


    <input
      type="text"
      placeholder="Full Name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
      required
    />


    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
      required
    />


    <input
      type="text"
      placeholder="Phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 w-full p-3 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
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
  disabled={loading}
  className={`w-full py-3 rounded text-white transition ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? "Creating account..." : "Register"}
</button>


    <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">

      Already have an account?

      <span
        className="text-blue-600 dark:text-blue-400 cursor-pointer ml-1 hover:underline"
        onClick={() => navigate("/login")}
      >
        Login
      </span>

    </p>

  </form>

</div>

  );
}

export default Register;