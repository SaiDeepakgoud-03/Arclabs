import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Checkout.css";
import { PRODUCTS } from "../data/products";


export default function Checkout() {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const productId = query.get("product");
  const price = query.get("price");

  const product = PRODUCTS.find((p) => p.id === productId);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
    };
    script.onerror = () => {
      setRazorpayLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Payment handler
  const handlePayment = () => {
    if (!form.name || !form.email || !form.phone || !form.city) {
      alert("⚠️ Please fill all details");
      return;
    }

    if (!price || !product) {
      alert("❌ Invalid product or price");
      return;
    }

    if (!razorpayLoaded) {
      alert("Payment system loading...");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay not available");
      return;
    }

    setLoading(true);

    try {
      const amountInPaisa = Math.round(Number(price) * 100);

      const options = {
        key: "rzp_live_RpqmHVVJcg5JMQ",
        amount: amountInPaisa,
        currency: "INR",
        name: "ARC LABS",
        description: `Purchase: ${product.name}`,
        notes: {
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          customer_city: form.city,
          product_id: productId,
        },

        // Enable all payment methods
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#00FFC6",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            alert("Payment cancelled");
          },
        },

        handler: function (response) {
          setLoading(false);
          alert(
            `✅ Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}`
          );
          setForm({ name: "", email: "", phone: "", city: "" });
          setTimeout(() => {
            navigate("/products", { replace: true });
          }, 2000);
        },

        timeoutNotification: function () {
          setLoading(false);
          alert("Payment timeout. Please try again.");
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        setLoading(false);
        alert("Payment failed: " + response.error.reason);
      });

      rzp.open();
    } catch (err) {
      setLoading(false);
      alert("Payment Error: " + err.message);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        {/* LEFT: PRODUCT */}
        <div className="checkout-left">
          {product?.image && (
            <img src={product.image} alt={product?.name} />
          )}
          <h2>{product?.name || "Product"}</h2>
          <p className="price">₹{price}</p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginTop: "10px",
            }}
          >
            Secure payment powered by Razorpay
          </p>
        </div>

        {/* RIGHT: FORM */}
        <div className="checkout-right">
          <h3>Enter Your Details</h3>

          <input
            type="text"
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            disabled={loading}
            required
          />

          <input
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={loading}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={loading}
            required
            pattern="[0-9]{10}"
          />

          <input
            type="text"
            placeholder="City *"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            disabled={loading}
            required
          />

          {/* ✅ PAYMENT BUTTON */}
          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading || !razorpayLoaded}
            style={{
              opacity: loading || !razorpayLoaded ? 0.6 : 1,
              cursor: loading || !razorpayLoaded ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Processing..." : `Pay ₹${price}`}
          </button>

          <p
            style={{
              fontSize: "0.75rem",
              color: "#999",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            💳 Your payment information is secure and encrypted
          </p>

          {!razorpayLoaded && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#ff6b6b",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              Loading payment system... Please wait.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}