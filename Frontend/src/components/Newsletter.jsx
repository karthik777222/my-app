import React, { useState } from "react";

function NewsletterBox() {
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="newsletter">

      <h2>Subscribe to our Newsletter</h2>

      <p>
        Get updates about our latest products and offers.
      </p>

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          SUBSCRIBE
        </button>
      </form>

    </section>
  );
}

export default NewsletterBox;