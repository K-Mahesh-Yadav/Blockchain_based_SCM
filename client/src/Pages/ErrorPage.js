import React from 'react';

const Error404 = () => {
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f7f7f7"
      }}>
      <div style={{
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#fff",
    boxShadow:" 0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px"
  }}>
        <h1 style={{
    fontSize: "4rem",
    marginBottom: "1rem",
    color: "#ff6b6b"
  }}>404</h1>
        <p style={{
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "#555"
  }}>Oops! The page you're looking for doesn't exist.</p>
        <a style={{
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ff6b6b",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    transition:" background-color 0.3s ease"
  }} href="/">Go back to the homepage</a>
      </div>
    </div>
  );
};

export default Error404;
