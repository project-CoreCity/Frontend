import { useEffect, useRef } from "react";
import { updateVisuals } from "@/utils/threeJS/updateVisuals";

const useVisualUpdates = (data, refs) => {
  const initialized = useRef(false);

  useEffect(() => {
    let interval;

    if (!initialized.current) {
      interval = setInterval(() => {
        updateVisuals(data, refs);

        clearInterval(interval);

        initialized.current = true;
      }, 1000);
    }

    updateVisuals(data, refs);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [data]);
};

export default useVisualUpdates;
