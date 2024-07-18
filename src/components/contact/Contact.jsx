import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

import "./contact.css";
import ThankYouModal from "./ThankYouModal";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formUrl = "https://formspree.io/f/maygvybo";

    fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className='container contact__container'>
        <div className='contact__options'>
          <article className='contact__option'>
            <MdOutlineEmail className='contact__option-icon' />
            <h4>Email</h4>
            <h5>mishakmanuel@gmail.com</h5>
            <a href='mailto:mishakmanuel@gmail.com'>Send a message</a>
          </article>
        </div>

        <div className='contact__options'>
          <article className='contact__option'>
            <FaPhone className='contact__option-icon' />
            <h4>Phone</h4>
            <h5>+2348166593337</h5>
          </article>
        </div>

        {submitted ? (
          <ThankYouModal />
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Your Full Name'
              id='name'
              name='name'
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type='text'
              placeholder='Your Email'
              id='email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              placeholder='Your message'
              id='message'
              rows='5'
              name='message'
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type='submit' className='btn btn-primary'>
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
