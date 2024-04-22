import { useCallback, useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const useFingerprint = (currentId?: string) => {
  const [fpId, setFPId] = useState<string>("");

  const getFingerprint = useCallback(async () => {
    try {
      const fp = await FingerprintJS.load();
      const result: any = await fp.get();
      setFPId(result.visitorId);
      if (currentId && currentId === result.visitorId) {
        setFPId(currentId);
      } else {
        setFPId(result.visitorId);
        localStorage.setItem("fingerprintId", result.visitorId);
      }
    } catch (error) {
      console.error("Error getting fingerprint:", error);
    }
  }, [currentId]);

  useEffect(() => {
    getFingerprint();
  }, [getFingerprint]);

  return { fpId, refresh: getFingerprint };
};
