import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/Checkout.css";
import { PRODUCTS } from "../data/products";


export default function Checkout() {
  const query = new URLSearchParams(useLocation().search);

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
  const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

  // ✅ PAYMENT FUNCTION
  const handlePayment = async () => {
  try {
    // ✅ Load Razorpay script dynamically
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    console.log("Razorpay loaded");

    // 1️⃣ Create order
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Number(price) }),
    });

    const order = await res.json();

    if (!order.id) {
      alert("Order creation failed");
      return;
    }

    // 2️⃣ Razorpay config
    const options = {
      key: "rzp_live_RpqmHVVJcg5JMQ", // 🔥 use TEST key
      amount: order.amount,
      currency: "INR",
      name: "ARC LABS",
      description: product?.name,
      order_id: order.id,

      handler: function (response) {
        alert("Payment Successful 🎉");
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      theme: {
        color: "#00FFC6",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};
  return (
    <div className="checkout-page">
      <div className="checkout-card">

        {/* LEFT: PRODUCT */}
        <div className="checkout-left">
          <img src={product?.image} alt={product?.name} />
          <h2>{product?.name}</h2>
          <p className="price">₹{price}</p>
        </div>

        {/* RIGHT: FORM */}
        <div className="checkout-right">
          <h3>Enter Details</h3>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />

          {/* ✅ PAYMENT BUTTON */}
          <button className="pay-btn" onClick={handlePayment}>
            Pay ₹{price}
          </button>
        </div>

      </div>
    </div>
  );
}