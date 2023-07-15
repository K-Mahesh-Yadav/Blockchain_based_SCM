import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
// import Cookies from "universal-cookie";

import Navbar from "../../Components/Navbar";

const ADSTDashboard = () => {
  // let cookie = new Cookies();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const userData = state.userData;
  const account = state.account;


  const handleRequestClick = () => {
    navigate(`request`, { state: { userData ,account} });
  };

  const handleReceivedRequestsClick = () => {
    navigate('AdrrRequests', { state: { userData ,account} });
  };

  const handleAllRequestsClick = () => {
    navigate(`Allreq`, { state: { userData ,account} });
  };

  const handleTransactionsClick = () => {
    navigate('Transactions', { state: { userData ,account} });
  };

  return (
    <>
    <Navbar x={userData}/>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">
          Sathyameva Jayathe
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">
              Home<span className="sr-only">(current)</span>
            </a>
          </div>
        </div>
        <div>
          <div id="user_name" style={{ color: 'aliceblue' }}>
            {x}
          </div>
        </div>
        <div>
          <a className="nav-item nav-link active" href="/">
            <button className="bg-primary" style={{ margin: '0 30px' }} onClick={()=>{
              cookie.remove("jwt");
            }}>
              Logout
            </button>
          </a>
        </div>
      </nav> */}

      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6 col-lg-3">
            <button onClick={handleRequestClick} className="btn btn-dark btn-block mb-3">
              Request For Supplies
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <button onClick={handleReceivedRequestsClick} className="btn btn-dark btn-block mb-3">
              Received Requests
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <button onClick={handleAllRequestsClick} className="btn btn-dark btn-block mb-3">
              All Requests
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <button onClick={handleTransactionsClick} className="btn btn-dark btn-block mb-3">
              Transactions
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default ADSTDashboard;
