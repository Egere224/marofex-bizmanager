import { createContext, useState, useEffect } from "react";

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load from localStorage on app start
  useEffect(() => {
    const savedBusiness = localStorage.getItem("business");

    if (savedBusiness) {
      setBusiness(JSON.parse(savedBusiness));
    }

    setLoading(false);
  }, []);

  // ✅ Save whenever business changes
  useEffect(() => {
    if (business) {
      localStorage.setItem("business", JSON.stringify(business));
    } else {
      localStorage.removeItem("business");
    }
  }, [business]);

  // ✅ Optional helper (cleaner usage)
  const selectBusiness = (data) => {
    setBusiness(data);
  };

  const clearBusiness = () => {
    setBusiness(null);
  };

  return (
    <BusinessContext.Provider
      value={{
        business,
        setBusiness,
        selectBusiness,
        clearBusiness,
        loading,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};