import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useSnap = () => {
  const [snap, setSnap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let scriptLoaded = false;

    const loadSnap = async () => {
      try {
        // Check if snap is already in window object
        if (window.snap) {
          setSnap(window.snap);
          setIsLoading(false);
          return;
        }

        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "YOUR_CLIENT_KEY");
        script.async = true;

        // Create a promise to handle script loading
        const scriptLoadPromise = new Promise((resolve, reject) => {
          script.onload = () => {
            scriptLoaded = true;
            if (window.snap) {
              resolve(window.snap);
            } else {
              reject(new Error("Snap object not found after script load"));
            }
          };
          script.onerror = () => {
            reject(new Error("Failed to load Midtrans Snap script"));
          };
        });

        document.body.appendChild(script);

        // Wait for script to load
        const snapObject = await scriptLoadPromise;
        setSnap(snapObject);
      } catch (err) {
        setError(err.message);
        console.error("Error initializing Snap:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSnap();

    // Cleanup
    return () => {
      if (scriptLoaded) {
        const script = document.querySelector('script[src*="snap.js"]');
        if (script?.parentNode) {
          script.parentNode.removeChild(script);
        }
      }
    };
  }, []);

  const snapEmbed = async (snapToken, embedId) => {
    if (isLoading) {
      console.log("Snap is still loading...");
      return;
    }

    if (error) {
      console.error("Snap failed to initialize:", error);
      return;
    }

    if (!snap) {
      console.error("Snap is not initialized");
      return;
    }

    if (!embedId) {
      console.error("embedId is required");
      return;
    }

    const element = document.getElementById(embedId);
    if (!element) {
      console.error(`Element with ID ${embedId} not found`);
      return;
    }

    try {
      await snap.embed(snapToken, {
        embedId,
        onSuccess: (result) => {
          console.log("Payment Success:", result);
          navigate("/user/daftar-transaksi");
        },
        onPending: (result) => {
          console.log("Payment Pending:", result);
        },
        onError: (result) => {
          console.error("Payment Error:", result);
        },
        onClose: () => {
          console.log(
            "Customer closed the popup without finishing the payment"
          );
        },
      });
    } catch (error) {
      console.error("Error embedding Snap:", error);
    }
  };

  return { snapEmbed, isLoading, error };
};

export default useSnap;
