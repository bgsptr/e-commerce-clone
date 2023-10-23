import { useEffect, useState } from "react";
import NavShopee from "../components/NavShopee";
import { redirect } from "react-router-dom";

const Checkout = () => {
  // const navigate = useNavigate();
  const [snapToken, setSnapToken] = useState("");
  const token = localStorage.getItem("token");
  const snapURL = "https://app.sandbox.midtrans.com/snap/snap.js";
  const client_key = "Mid-client-90ptcsHy8vHlOzFC";

  const handlePayment = (callback) => {
    if (snapToken) {
      const snap = window.snap;
      console.log(snap)
      snap.pay(snapToken, {
        onSuccess: () => {
          console.log("Success");
        },
        onPending: () => {
          console.log("Pending");
        },
        onError: () => {
          console.log("Error");
        },
        onClose: () => {
          console.log("Close");
        },
      });
      console.log(snapToken)
      redirect(`/${snapToken.redirect_url}`);
    } else {
      callback(new Error('Failed to fetch snap token'),null);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = snapURL;
    script.setAttribute("data-client-key", client_key);
    document.head.appendChild(script);

    script.onload = () => {
      const url = "http://localhost:3000/api/v1/payment";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          setSnapToken(data);
        })
        .catch((err) => console.log(err));
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [token, client_key]);

  return (
    <div>
      <NavShopee />
      <button
        className="bg-[#ee4d2d] text-white relative right-5 w-48 z-999 p-2.5 m-4 rounded-sm"
        onClick={handlePayment}
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
