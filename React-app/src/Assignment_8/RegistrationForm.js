// Create a component called RegistrationForm that captures user details using various input types.

// State:

// formData – an object with:

// username (string)

// email (string)

// password (string)

// confirmPassword (string)

// gender (string – 'male', 'female', or 'other')

// isSubscribed (boolean – newsletter checkbox)

// country (string – selected from a dropdown)

import { useState } from "react";

function RegistrationForm(){
	const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    isSubscribed: false,
    country: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    // Reset submission status when user makes changes
    setIsSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    // Username: required, min 3 chars
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    // Email: required, must contain @ and .
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email (contains @ and .).';
    }

    // Password: required, min 6 chars
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

	 // Confirm Password: required, must match password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Gender: required
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender.';
    }

    // Country: required
    if (!formData.country) {
      newErrors.country = 'Please select a country.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      setSubmitSuccess(true);
      // You could send data to an API here
      console.log('Form submitted:', formData);
    } else {
      setSubmitSuccess(false);
    }
  };

  const handleClear = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      isSubscribed: false,
      country: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitSuccess(false);
  };
return (
    <div style={containerStyle}>
      <h2>Registration Form</h2>

      {/* Success message */}
      {submitSuccess && (
        <div style={successStyle}>
          Registration successful for <strong>{formData.username}</strong>!
        </div>
      )}

      {/* Generic error message */}
      {isSubmitted && !submitSuccess && Object.keys(errors).length > 0 && (
        <div style={errorBannerStyle}>
          Please fix the errors below before submitting.
        </div>
      )}

      <form onSubmit={handleSubmit} style={formStyle}>
        {/* --- Username --- */}
        <div style={fieldStyle}>
          <label>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.username && <div style={errorStyle}>{errors.username}</div>}
        </div>

        {/* --- Email --- */}
        <div style={fieldStyle}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        {/* --- Password --- */}
        <div style={fieldStyle}>
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}
        </div>

        {/* --- Confirm Password --- */}
        <div style={fieldStyle}>
          <label>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
        </div>

        {/* --- Gender (Radio buttons) --- */}
        <div style={fieldStyle}>
          <label>Gender *</label>
          <div style={radioGroupStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
          {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
        </div>

        {/* --- Country (Select dropdown) --- */}
        <div style={fieldStyle}>
          <label>Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value="">-- Select a country --</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
          </select>
          {errors.country && <div style={errorStyle}>{errors.country}</div>}
        </div>

        {/* --- Newsletter (Checkbox) --- */}
        <div style={fieldStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="isSubscribed"
              checked={formData.isSubscribed}
              onChange={handleChange}
            />
            Subscribe to our newsletter
          </label>
        </div>

        {/* --- Buttons --- */}
        <div style={buttonGroupStyle}>
          <button type="submit" style={{ ...buttonStyle, backgroundColor: '#28a745' }}>
            Register
          </button>
          <button
            type="button"
            onClick={handleClear}
            style={{ ...buttonStyle, backgroundColor: '#6c757d' }}
          >
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  maxWidth: '550px',
  margin: '40px auto',
  padding: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  border: '1px solid #e0e0e0',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const fieldStyle = {
  marginBottom: '8px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box',
  marginTop: '4px',
};

const selectStyle = {
  ...inputStyle,
  backgroundColor: 'white',
};

const radioGroupStyle = {
  display: 'flex',
  gap: '20px',
  marginTop: '4px',
};

const radioLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
};

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '16px',
};

const errorStyle = {
  color: '#dc3545',
  fontSize: '14px',
  marginTop: '4px',
  fontWeight: '500',
};

const errorBannerStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '15px',
  border: '1px solid #f5c6cb',
};

const successStyle = {
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '12px',
  borderRadius: '6px',
  marginBottom: '15px',
  border: '1px solid #c3e6cb',
  fontWeight: 'bold',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '15px',
  marginTop: '10px',
};

const buttonStyle = {
  flex: 1,
  padding: '12px',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

export default RegistrationForm ;