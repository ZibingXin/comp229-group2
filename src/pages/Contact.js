import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import { contactService } from '../services/apiService';
import "../style/about&contact.css"

function Contact() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    message: '',
  });

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await contactService.submitContactForm(formData); 
        alert('Your message has been sent successfully!');
        navigate('/'); 
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Failed to send your message. Please try again later.');
    }
};

  const handleReset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      message: '',
    });
  };

  return (
    <div className="contact">
      <main>
        <form id="contact-form" onSubmit={handleSubmit} onReset={handleReset}>
          <h1>Contact Us</h1>
          <p>
            <b>Required fields are marked with</b>
            <sup> *</sup>
          </p>

          <label htmlFor="firstname">
            First Name<span>*</span>:
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="lastname">
            Last Name<span>*</span>:
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="email">
            Email<span>*</span>:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="someone@someplace.ca"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="phoneNumber">
            Phone Number<span>*</span>:
          </label>
          <input
            type="tel"
            name="phonenumber"
            id="phoneNumber"
            placeholder="123-456-7890"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <label htmlFor="message">
            Message<span>*</span>:
          </label>
          <textarea
            name="message"
            id="message"
            rows="4"
            cols="50"
            placeholder="Enter your message here..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />
        </form>
      </main>
    </div>
  );
}

export default Contact;
