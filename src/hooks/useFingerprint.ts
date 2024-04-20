import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useFingerprint = () => {
  const [fpId, setFPId] = useState<string>("");

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result: any = await fp.get();
        setFPId(result.visitorId);
      } catch (error) {
        console.error("Error getting fingerprint:", error);
      }
    };

    getFingerprint();
  }, []);

  return fpId;
};

export default useFingerprint;
