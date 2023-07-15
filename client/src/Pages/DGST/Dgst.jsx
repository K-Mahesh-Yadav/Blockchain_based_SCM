import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Navbar from "../../Components/Navbar";

function DgstDashboard() {
  const x = useLocation().state.userData;
  const userData = x;
  const navigate = useNavigate();
  const account = useLocation().state.account;

  const handleAddNewClick = () => {
    navigate('Addnew', { state: { userData ,account} });
  };

  const handleReceivedRequestsClick = () => {
    navigate('DgrrRequests', { state: { userData ,account} });
  };

  const handleAllRequestsClick = () => {
    navigate('Allreq', { state: { userData ,account} });
  };

  const handleTransactionsClick = () => {
    navigate('Transactions', { state: { userData ,account} });
  };
  // const handleUpdatePassword = () => {
  //   navigate('UpdatePassword', { state: { userData ,account} });
  // };

  return (
    <>
        <Navbar x={x}/>
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
            <button onClick={handleReceivedRequestsClick} className="btn btn-dark btn-block mb-3">
              Get Received Requests
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <button onClick={handleAllRequestsClick} className="btn btn-dark btn-block mb-3">
              Get All Requests
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <button onClick={handleTransactionsClick} className="btn btn-dark btn-block mb-3">
              Transactions
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <button onClick={handleAddNewClick} className="btn btn-dark btn-block mb-3">
            Add new Unit or Division
            </button>
          </div>
          {/* <div className="col-12 col-md-6 col-lg-3">
            <button onClick={handleUpdatePassword} className="btn btn-dark btn-block mb-3">
              Update password
            </button>
          </div> */}
        </div>
      </div>
      <div className="container mt-5">
        <Outlet />
      </div>
    </>
  );
}

export default DgstDashboard;
