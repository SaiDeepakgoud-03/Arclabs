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

  // ✅ FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // ✅ Load Razorpay on component mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Razorpay SDK loaded");
      setRazorpayLoaded(true);
    };
    script.onerror = () => {
      console.error("❌ Failed to load Razorpay SDK");
      setRazorpayLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // ✅ PAYMENT FUNCTION - Mobile Optimized
  const handlePayment = async () => {
    // ✅ Validate form
    if (!form.name || !form.email || !form.phone || !form.city) {
      alert("Please fill all details");
      return;
    }

    if (!price || !product) {
      alert("Invalid product or price");
      return;
    }

    if (!razorpayLoaded) {
      alert("Payment system loading... Please wait a moment and try again.");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not available. Please check your internet connection.");
      return;
    }

    setLoading(true);

    try {
      const options = {
        key: "rzp_live_RpqmHVVJcg5JMQ",
        amount: Math.round(Number(price) * 100), // Ensure proper amount format
        currency: "INR",
        name: "ARC LABS",
        description: `Purchase: ${product.name}`,
        notes: {
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          customer_city: form.city,
        },

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#00FFC6",
        },

        // ✅ Mobile responsive config
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed");
            setLoading(false);
            alert("Payment cancelled. Please try again.");
          },
          escape: false,
          backdropclose: false,
        },

        // ✅ Success callback
        handler: function (response) {
          console.log("✅ Payment successful:", response);
          setLoading(false);

          alert(`✅ Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}\n\nThank you for your purchase!`);

          // Log order details
          console.log("Order Details:", {
            name: form.name,
            email: form.email,
            phone: form.phone,
            city: form.city,
            product: product.name,
            price: price,
            paymentId: response.razorpay_payment_id,
          });

          // Reset form
          setForm({ name: "", email: "", phone: "", city: "" });

          // Redirect after 2 seconds
          setTimeout(() => {
            navigate("/products");
          }, 2000);
        },
      };

      console.log("Opening Razorpay with options:", options);

      const rzp = new window.Razorpay(options);

      // ✅ Handle payment errors
      rzp.on("payment.failed", function (response) {
        console.error("❌ Payment failed:", response.error);
        setLoading(false);
        alert(
          `❌ Payment Failed\n\nError: ${response.error.reason || "Unknown error"}\n\nPlease try again or contact support.`
        );
      });

      // Open payment modal
      rzp.open();

    } catch (err) {
      console.error("❌ Payment error:", err);
      setLoading(false);
      alert(
        "❌ Payment Error: " +
          (err.message || "Something went wrong. Please try again.")
      );
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