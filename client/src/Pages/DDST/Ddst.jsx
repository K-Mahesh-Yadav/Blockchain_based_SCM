import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Navbar from "../../Components/Navbar";

function DDSTDashboard() {
  const userData = useLocation().state.userData;
  const account = useLocation().state.account;
  const Navigate = useNavigate();
  const handleReceivedRequestsClick = () => {
    Navigate('DdrrRequests', { state: { userData , account} });
  };

  const handleAllRequestsClick = () => {
    Navigate('Allreq', { state: { userData ,account} });
  };

  const handleTransactionsClick = () => {
    Navigate('Transactions', { state: { userData ,account} });
  };

  return (<>
    <Navbar x={userData}/>

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
    <div className='Container mt-5'>
      <Outlet />
    </div>
  </>

  );
}

export default DDSTDashboard;
