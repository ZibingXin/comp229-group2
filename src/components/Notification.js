import React from 'react';

const Notification = ({ successMessage, message }) => {
  return (
    <>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </>
  );
};

export default Notification;
