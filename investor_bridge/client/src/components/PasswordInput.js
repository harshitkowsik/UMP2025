import React, { useState, useEffect } from 'react';

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const PasswordInput = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(value));
  }, [value]);

  return (
    <div>
      <div className="input-group mb-2">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="form-control"
          placeholder="Enter password"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>

      {value.length > 0 && (
        <>
          <div className="progress mb-1" style={{ height: '5px' }}>
  <div
    className={`progress-bar-striped ${
      passwordStrength === 5 ? 'bg-success' :
      passwordStrength >= 3 ? 'bg-info' : 'bg-danger'
    }`}
    role="progressbar"
    style={{ width: `${passwordStrength * 20}%` }}
    aria-valuenow={passwordStrength}
    aria-valuemin="0"
    aria-valuemax="5"
  ></div>
</div>
<small className={`text-${
  passwordStrength === 5 ? 'success' :
  passwordStrength >= 3 ? 'info' : 'danger'
}`}>
  {passwordStrength === 5 ? 'Strong Password' :
   passwordStrength >= 3 ? 'Medium Password' : 'Weak Password'}
</small>
        </>
      )}
    </div>
  );
};

export default PasswordInput;
