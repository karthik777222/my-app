import React from "react";

function Contact() {
  const submit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <section className="page">

      <h1>Contact Us</h1>

      <p>
        Have any questions? Contact us.
      </p>

      <form
        className="order-form"
        onSubmit={submit}
      >

        <input
          required
          placeholder="Your Name"
        />

        <input
          required
          type="email"
          placeholder="Your Email"
        />

        <textarea
          required
          placeholder="Your Message"
          rows="5"
        />

        <button type="submit">
          SEND MESSAGE
        </button>

      </form>

    </section>
  );
}

export default Contact;