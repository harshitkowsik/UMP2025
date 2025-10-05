import React, { useState } from 'react';
import eBusImage from '../images/e-bus.jpg';

const HomePage = () => {
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFeedback({ ...feedback, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
      setFeedback({ name: '', email: '', message: '' });
    } catch {
      setError('Error submitting feedback. Please try again.');
    }
  };

  return (
    <>
      <section className="container my-5 p-4 rounded shadow bg-white border">
        <h1 className="display-3 fw-bold text-center mb-3">Ebus Management System</h1>
        <p className="lead text-dark text-center mb-4">
          Smart, real-time transit solutions at your fingertips.
        </p>
        <img
          src={eBusImage}
          alt="Public transportation"
          className="img-fluid rounded shadow-sm mx-auto d-block"
          style={{ maxHeight: '350px' }}
        />
      </section>

      <section className="container my-5 p-4 rounded shadow bg-white border">
        <h2 className="text-center mb-4">Our Key Features</h2>
        <div className="row text-center">
          <FeatureCard icon="bi bi-speedometer2" title="Real-time Tracking" description="Know exactly where your bus is at any moment." />
          <FeatureCard icon="bi bi-person-badge" title="Driver Management" description="Manage driver accounts effortlessly and securely." />
          <FeatureCard icon="bi bi-phone" title="Contact Support" description="Reach out anytime for assistance with your transit needs." />
        </div>
      </section>

      <section className="container my-5 p-4 rounded shadow bg-white border">
        <h2 className="text-center mb-4">What Our Users Say</h2>
        <TestimonialCarousel />
      </section>

      <section className="container my-5 p-4 rounded shadow bg-white border">
        <h2 className="text-center mb-4">Send Us Your Feedback</h2>
        {submitted && (
          <div className="alert alert-success" role="alert">
            Thank you for your feedback!
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form className="mx-auto" style={{ maxWidth: '600px' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input required type="text" id="name" name="name" className="form-control" value={feedback.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input required type="email" id="email" name="email" className="form-control" value={feedback.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea required id="message" name="message" rows="4" className="form-control" value={feedback.message} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Feedback
          </button>
        </form>
      </section>

      <footer className="bg-primary text-center py-4 mt-5">
        <p className="mb-0">&copy; 2025 Ebus Management System. All rights reserved.</p>
      </footer>
    </>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="col-md-4 mb-3">
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <i className={`${icon} fs-1 text-primary mb-3`}></i>
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-secondary">{description}</p>
      </div>
    </div>
  </div>
);

const TestimonialCarousel = () => {
  const testimonials = [
    { id: 1, text: 'This system made my daily commute so easy!', author: 'Alice K.' },
    { id: 2, text: 'Efficient and user-friendly. Highly recommend.', author: 'Rahul P.' },
    { id: 3, text: 'Impressive real-time updates. Saves time!', author: 'Sophia W.' },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="carousel-inner">
        {testimonials.map((t, i) => (
          <div key={t.id} className={`carousel-item ${i === activeIndex ? 'active' : ''}`}>
            <blockquote className="blockquote text-center p-4">
              <p className="mb-2 fst-italic">"{t.text}"</p>
              <footer className="blockquote-footer">{t.author}</footer>
            </blockquote>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target=".carousel" data-bs-slide="prev" onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}>
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button className="carousel-control-next" type="button" data-bs-target=".carousel" data-bs-slide="next" onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}>
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </div>
  );
};

export default HomePage;
