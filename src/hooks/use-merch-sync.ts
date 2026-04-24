import { useEffect } from "react";
import { useMerchCart } from "@/stores/merchCart";

export function useMerchSync() {
  const syncCart = useMerchCart((s) => s.syncCart);
  useEffect(() => {
    syncCart();
    const onVis = () => {
      if (document.visibilityState === "visible") syncCart();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [syncCart]);
}
