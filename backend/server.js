const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

// 🔐 Razorpay setup
const razorpay = new Razorpay({
  key_id: "rzp_live_RpqmHVVJcg5JMQ",
  key_secret: "tfloeqkaDAgJNF5CSeX13JVd",
});

// 👉 API 1: Create Order
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100, // paisa
    currency: "INR",
  });

  res.json(order);
});

// 👉 API 2: Send Email
app.post("/send-mail", async (req, res) => {
  const { name, email, phone, city, product, price, paymentId } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your@gmail.com",
      pass: "your_app_password",
    },
  });

  const message = `
New Order

Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city}

Product: ${product}
Amount: ₹${price}
Payment ID: ${paymentId}
`;

  // Company mail
  await transporter.sendMail({
    from: "your@gmail.com",
    to: "hello@arclabs.in",
    subject: "New Order",
    text: message,
  });

  // Buyer mail
  await transporter.sendMail({
    from: "your@gmail.com",
    to: email,
    subject: "Payment Successful",
    text: `Hi ${name}, your payment was successful.\n\n${message}`,
  });

  res.send("Mail sent");
});

// Run server
app.listen(5000, () => console.log("Server running on port 5000"));