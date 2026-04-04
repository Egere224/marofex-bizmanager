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
        const res = await getBusinessById(parsed.id);
        const payload = res.data.data || res.data;
const businessData = payload.business || payload;
setBusiness({
  ...businessData,
  subscription: payload.subscription,
});
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
     console.log("business info", res)
  const payload = res.data.data || res.data;
  const businessData = payload.business || payload;
setBusiness({
  ...businessData,
  subscription: payload.subscription,
}); // ✅ full data with subscription
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