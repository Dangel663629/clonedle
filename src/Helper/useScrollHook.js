import { useEffect } from "react";

//making sure you can't scroll over page body when overlay is open
export const useScrollHook = (visibility) => {
  useEffect(() => {
    if (visibility) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visibility]);
};
