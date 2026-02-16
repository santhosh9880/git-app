const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 3000;
const domainURL = process.env.DOMAIN || "http://localhost:3000";

// Stripe setup (safe fallback key)
const stripe = require("stripe")(process.env.SECRET_KEY || "sk_test_dummy");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
const staticDir = process.env.STATIC_DIR || "client";
app.use(express.static(path.join(__dirname, staticDir)));

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, staticDir, "index.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, staticDir, "success.html"));
});

app.get("/cancel", (req, res) => {
  res.sendFile(path.join(__dirname, staticDir, "cancel.html"));
});

// stripe checkout route
app.post("/create-checkout-session/:pid", async (req, res) => {
  try {
    const priceId = req.params.pid;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${domainURL}/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/cancel`,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Stripe error");
  }
});

// start server
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
