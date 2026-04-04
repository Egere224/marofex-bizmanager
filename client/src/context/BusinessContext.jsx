import { createContext, useContext, useState, useEffect } from "react";
import { getBusinessById } from "../services/businessService";

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const initBusiness = async () => {
    const savedBusiness = localStorage.getItem("business");

    if (savedBusiness) {
      const parsed = JSON.parse(savedBusiness);

      try {
        // 🔥 Fetch fresh data from backend
        const res = await getBusinessById(parsed.id);

        // ✅ Save fresh business (with subscription)
        setBusiness(res.data);
      } catch (err) {
        console.error("Failed to load business", err);

        // fallback (optional)
        setBusiness(parsed);
      }
    }

    setLoading(false);
  };

  initBusiness();
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
  const selectBusiness = async (data) => {
  try {
    const res = await getBusinessById(data.id);
     console.log("business info", res.data)
    setBusiness(res.data); // ✅ full data with subscription
  } catch (err) {
    console.error("Failed to select business", err);
  }
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

export const useBusiness = () => {
  return useContext(BusinessContext);
};